import { createServer, Model, Response } from 'miragejs';
import { schoolsData } from './data/schools';
import { classesData } from './data/classes';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      school: Model,
      class: Model,
    },

    seeds(server) {
      schoolsData.forEach((school) => {
        server.create('school', school);
      });

      classesData.forEach((classItem) => {
        server.create('class', classItem);
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

      this.passthrough((request) => {
        return request.url.includes('localhost') || request.url.includes('127.0.0.1');
      });
    },
  });
}
