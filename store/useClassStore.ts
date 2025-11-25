import { create } from 'zustand';
import { Class, CreateClassDTO, UpdateClassDTO } from '@/types';
import { classService } from '@/services/classes';

interface ClassState {
  classes: Class[];
  selectedClass: Class | null;
  isLoading: boolean;
  error: string | null;
  filterSchoolId: string | null;

  fetchClasses: (schoolId?: string) => Promise<void>;
  fetchClassById: (id: string) => Promise<void>;
  createClass: (data: CreateClassDTO) => Promise<void>;
  updateClass: (data: UpdateClassDTO) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  setFilterSchoolId: (schoolId: string | null) => void;
  clearError: () => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  selectedClass: null,
  isLoading: false,
  error: null,
  filterSchoolId: null,

  fetchClasses: async (schoolId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const filterBy = schoolId || get().filterSchoolId;
      const classes = await classService.getClasses(filterBy ? { schoolId: filterBy } : undefined);
      set({ classes, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  fetchClassById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const classItem = await classService.getClassById(id);
      set({ selectedClass: classItem, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  createClass: async (data: CreateClassDTO) => {
    set({ isLoading: true, error: null });
    try {
      const newClass = await classService.createClass(data);
      set((state) => ({
        classes: [...state.classes, newClass],
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

  updateClass: async (data: UpdateClassDTO) => {
    set({ isLoading: true, error: null });
    try {
      const updatedClass = await classService.updateClass(data.id, data);
      set((state) => ({
        classes: state.classes.map((c) => (c.id === data.id ? updatedClass : c)),
        selectedClass: state.selectedClass?.id === data.id ? updatedClass : state.selectedClass,
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

  deleteClass: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await classService.deleteClass(id);
      set((state) => ({
        classes: state.classes.filter((c) => c.id !== id),
        selectedClass: state.selectedClass?.id === id ? null : state.selectedClass,
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

  setFilterSchoolId: (schoolId: string | null) => {
    set({ filterSchoolId: schoolId });
  },

  clearError: () => {
    set({ error: null });
  },
}));
