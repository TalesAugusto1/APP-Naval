import { create } from 'zustand';
import { School, CreateSchoolDTO, UpdateSchoolDTO } from '@/types';
import { schoolService } from '@/services/schools';

interface SchoolState {
  schools: School[];
  selectedSchool: School | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  fetchSchools: () => Promise<void>;
  fetchSchoolById: (id: string) => Promise<void>;
  createSchool: (data: CreateSchoolDTO) => Promise<void>;
  updateSchool: (data: UpdateSchoolDTO) => Promise<void>;
  deleteSchool: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
}

export const useSchoolStore = create<SchoolState>((set, get) => ({
  schools: [],
  selectedSchool: null,
  isLoading: false,
  error: null,
  searchQuery: '',

  fetchSchools: async () => {
    set({ isLoading: true, error: null });
    try {
      const query = get().searchQuery;
      const schools = await schoolService.getSchools(query ? { search: query } : undefined);
      set({ schools, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  fetchSchoolById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const school = await schoolService.getSchoolById(id);
      set({ selectedSchool: school, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  createSchool: async (data: CreateSchoolDTO) => {
    set({ isLoading: true, error: null });
    try {
      const newSchool = await schoolService.createSchool(data);
      set((state) => ({
        schools: [...state.schools, newSchool],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
      throw error;
    }
  },

  updateSchool: async (data: UpdateSchoolDTO) => {
    set({ isLoading: true, error: null });
    try {
      const updatedSchool = await schoolService.updateSchool(data.id, data);
      set((state) => ({
        schools: state.schools.map((s) => (s.id === data.id ? updatedSchool : s)),
        selectedSchool: state.selectedSchool?.id === data.id ? updatedSchool : state.selectedSchool,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteSchool: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await schoolService.deleteSchool(id);
      set((state) => ({
        schools: state.schools.filter((s) => s.id !== id),
        selectedSchool: state.selectedSchool?.id === id ? null : state.selectedSchool,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
      throw error;
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearError: () => {
    set({ error: null });
  },
}));
