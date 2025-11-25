import { ApiError } from '@/types';

const BASE_URL = '/api';

class APIClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    if (__DEV__) {
      console.log(`[API] ${options?.method || 'GET'} ${url}`);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        throw this.handleError(response.status, data);
      }

      if (__DEV__) {
        console.log(`[API] Response:`, data);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (__DEV__) {
          console.error(`[API] Error:`, error.message);
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  private handleError(status: number, data: any): Error {
    const error: ApiError = {
      message: data.error || 'An error occurred',
      code: `HTTP_${status}`,
      status,
      details: data.details,
    };

    return new Error(error.message);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
