import { Class, CreateClassDTO, UpdateClassDTO, ApiResponse, QueryParams } from '@/types';
import { apiClient } from '../api/apiClient';
import { buildQueryString } from '../api/apiHelpers';
import { validateCreateClass, validateUpdateClass } from './classValidation';

class ClassService {
  async getClasses(params?: QueryParams & { schoolId?: string }): Promise<Class[]> {
    const query = params ? buildQueryString(params) : '';
    const response = await apiClient.get<ApiResponse<Class[]>>(`/classes${query}`);
    return response.data;
  }

  async getClassesBySchool(schoolId: string): Promise<Class[]> {
    return this.getClasses({ schoolId });
  }

  async getClassById(id: string): Promise<Class> {
    const response = await apiClient.get<ApiResponse<Class>>(`/classes/${id}`);
    return response.data;
  }

  async createClass(data: CreateClassDTO): Promise<Class> {
    const errors = validateCreateClass(data);
    if (errors.length > 0) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    const response = await apiClient.post<ApiResponse<Class>>('/classes', data);
    return response.data;
  }

  async updateClass(id: string, data: UpdateClassDTO): Promise<Class> {
    const errors = validateUpdateClass({ ...data, id });
    if (errors.length > 0) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    const response = await apiClient.put<ApiResponse<Class>>(`/classes/${id}`, data);
    return response.data;
  }

  async deleteClass(id: string): Promise<void> {
    await apiClient.delete(`/classes/${id}`);
  }
}

export const classService = new ClassService();
