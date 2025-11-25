import { School, CreateSchoolDTO, UpdateSchoolDTO, ApiResponse, QueryParams } from '@/types';
import { apiClient } from '../api/apiClient';
import { buildQueryString } from '../api/apiHelpers';
import { validateCreateSchool, validateUpdateSchool } from './schoolValidation';

class SchoolService {
  async getSchools(params?: QueryParams): Promise<School[]> {
    const query = params ? buildQueryString(params) : '';
    const response = await apiClient.get<ApiResponse<School[]>>(`/schools${query}`);
    return response.data;
  }

  async getSchoolById(id: string): Promise<School> {
    const response = await apiClient.get<ApiResponse<School>>(`/schools/${id}`);
    return response.data;
  }

  async createSchool(data: CreateSchoolDTO): Promise<School> {
    const errors = validateCreateSchool(data);
    if (errors.length > 0) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    const response = await apiClient.post<ApiResponse<School>>('/schools', data);
    return response.data;
  }

  async updateSchool(id: string, data: UpdateSchoolDTO): Promise<School> {
    const errors = validateUpdateSchool({ ...data, id });
    if (errors.length > 0) {
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    const response = await apiClient.put<ApiResponse<School>>(`/schools/${id}`, data);
    return response.data;
  }

  async deleteSchool(id: string): Promise<void> {
    await apiClient.delete(`/schools/${id}`);
  }

  async searchSchools(query: string): Promise<School[]> {
    return this.getSchools({ search: query });
  }
}

export const schoolService = new SchoolService();
