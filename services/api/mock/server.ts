import { createServer, Model, Response } from 'miragejs';
import { schoolsData } from './data/schools';
import { classesData } from './data/classes';

const mockUsers = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@escola.com',
    password: 'Admin123!',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Gestor Escolar',
    email: 'gestor@escola.com',
    password: 'Gestor123!',
    createdAt: new Date('2024-01-01').toISOString(),
  },
];

const sessions = new Map<string, string>();

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      school: Model,
      class: Model,
      user: Model,
    },

    seeds(server) {
      schoolsData.forEach((school) => {
        server.create('school', school);
      });

      classesData.forEach((classItem) => {
        server.create('class', classItem);
      });

      mockUsers.forEach((user) => {
        server.create('user', user);
      });

      console.log('🌱 Mock database seeded with sample data');
    },

    routes() {
      this.namespace = 'api';
      this.timing = 300;

      this.get('/schools', (schema, request) => {
        const schools = schema.all('school').models;
        const searchParam = request.queryParams.search;
        const searchQuery = typeof searchParam === 'string' ? searchParam.toLowerCase() : undefined;

        let filtered = schools;
        if (searchQuery) {
          filtered = schools.filter(
            (school: any) =>
              school.name.toLowerCase().includes(searchQuery) ||
              school.address.toLowerCase().includes(searchQuery)
          );
        }

        return { data: filtered, total: filtered.length };
      });

      this.get('/schools/:id', (schema, request) => {
        const id = request.params.id;
        const school: any = schema.find('school', id);

        if (!school) {
          return new Response(404, {}, { error: 'School not found' });
        }

        const classCount = schema.where('class', { schoolId: id } as any).length;
        school.attrs.classCount = classCount;

        return { data: school.attrs };
      });

      this.post('/schools', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const newSchool = schema.create('school', {
          ...data,
          classCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return new Response(201, {}, { data: newSchool.attrs });
      });

      this.put('/schools/:id', (schema, request) => {
        const id = request.params.id;
        const data = JSON.parse(request.requestBody);
        const school = schema.find('school', id);

        if (!school) {
          return new Response(404, {}, { error: 'School not found' });
        }

        school.update({
          ...data,
          updatedAt: new Date().toISOString(),
        });

        return { data: school.attrs };
      });

      this.delete('/schools/:id', (schema, request) => {
        const id = request.params.id;
        const school = schema.find('school', id);

        if (!school) {
          return new Response(404, {}, { error: 'School not found' });
        }

        schema.where('class', { schoolId: id } as any).destroy();
        school.destroy();

        return new Response(204);
      });

      this.get('/classes', (schema, request) => {
        const schoolIdParam = request.queryParams.schoolId;
        const searchParam = request.queryParams.search;
        const schoolId = typeof schoolIdParam === 'string' ? schoolIdParam : undefined;
        const search = typeof searchParam === 'string' ? searchParam : undefined;
        let classes: any[] = schema.all('class').models;

        if (schoolId) {
          classes = classes.filter((c: any) => c.schoolId === schoolId);
        }

        if (search) {
          classes = classes.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()));
        }

        return { data: classes, total: classes.length };
      });

      this.get('/classes/:id', (schema, request) => {
        const id = request.params.id;
        const classItem = schema.find('class', id);

        if (!classItem) {
          return new Response(404, {}, { error: 'Class not found' });
        }

        return { data: classItem.attrs };
      });

      this.post('/classes', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const newClass = schema.create('class', {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const school: any = schema.find('school', data.schoolId);
        if (school) {
          const classCount = schema.where('class', { schoolId: data.schoolId } as any).length;
          school.update({ classCount });
        }

        return new Response(201, {}, { data: newClass.attrs });
      });

      this.put('/classes/:id', (schema, request) => {
        const id = request.params.id;
        const data = JSON.parse(request.requestBody);
        const classItem = schema.find('class', id);

        if (!classItem) {
          return new Response(404, {}, { error: 'Class not found' });
        }

        classItem.update({
          ...data,
          updatedAt: new Date().toISOString(),
        });

        return { data: classItem.attrs };
      });

      this.delete('/classes/:id', (schema, request) => {
        const id = request.params.id;
        const classItem = schema.find('class', id);

        if (!classItem) {
          return new Response(404, {}, { error: 'Class not found' });
        }

        const schoolId = (classItem as any).schoolId;
        classItem.destroy();

        const school: any = schema.find('school', schoolId);
        if (school) {
          const classCount = schema.where('class', { schoolId } as any).length;
          school.update({ classCount });
        }

        return new Response(204);
      });

      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const users = schema.all('user').models;
        const user: any = users.find((u: any) => u.email === email);

        if (!user || user.password !== password) {
          return new Response(401, {}, { error: 'Email ou senha inválidos' });
        }

        const token = `token_${user.id}_${Date.now()}`;
        sessions.set(token, user.id);

        const { password: _, ...userData } = user.attrs;
        return { user: userData, token };
      });

      this.post('/auth/register', (schema, request) => {
        const { name, email, password } = JSON.parse(request.requestBody);

        const users = schema.all('user').models;
        const existingUser = users.find((u: any) => u.email === email);

        if (existingUser) {
          return new Response(409, {}, { error: 'Este email já está cadastrado' });
        }

        const newUser: any = schema.create('user', {
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        });

        const token = `token_${newUser.id}_${Date.now()}`;
        sessions.set(token, newUser.id);

        const { password: _, ...userData } = newUser.attrs;
        return new Response(201, {}, { user: userData, token });
      });

      this.post('/auth/forgot-password', (schema, request) => {
        const { email } = JSON.parse(request.requestBody);

        const users = schema.all('user').models;
        const user = users.find((u: any) => u.email === email);

        if (!user) {
          return new Response(404, {}, { error: 'Email não encontrado' });
        }

        return { message: 'Email de recuperação enviado com sucesso' };
      });

      this.get('/auth/me', (schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        const token = authHeader?.replace('Bearer ', '');

        if (!token || !sessions.has(token)) {
          return new Response(401, {}, { error: 'Token inválido ou expirado' });
        }

        const userId = sessions.get(token);
        const user: any = schema.find('user', userId!);

        if (!user) {
          return new Response(404, {}, { error: 'Usuário não encontrado' });
        }

        const { password: _, ...userData } = user.attrs;
        return { data: userData };
      });

      this.post('/auth/logout', (schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        const token = authHeader?.replace('Bearer ', '');

        if (token) {
          sessions.delete(token);
        }

        return { message: 'Logout realizado com sucesso' };
      });

      this.passthrough((request) => {
        return request.url.includes('localhost') || request.url.includes('127.0.0.1');
      });
    },
  });
}
