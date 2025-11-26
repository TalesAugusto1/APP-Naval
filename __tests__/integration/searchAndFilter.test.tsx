import React from 'react';
import { act } from '@testing-library/react-native';
import { useSchoolStore } from '@/store/useSchoolStore';
import { useClassStore } from '@/store/useClassStore';
import { schoolService } from '@/services/schools';
import { classService } from '@/services/classes';
import { mockSchoolData, mockClassData } from '../utils/testUtils';

jest.mock('@/services/schools');
jest.mock('@/services/classes');

const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;
const mockClassService = classService as jest.Mocked<typeof classService>;

describe('Search and Filter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSchoolStore.setState({
      schools: [],
      selectedSchool: null,
      isLoading: false,
      error: null,
      searchQuery: '',
    });
    useClassStore.setState({
      classes: [],
      selectedClass: null,
      isLoading: false,
      error: null,
      filterSchoolId: null,
    });
  });

  describe('School Search', () => {
    it('should search schools by query', async () => {
      const searchResults = mockSchoolData.createMany(2);
      mockSchoolService.getSchools.mockResolvedValue(searchResults);

      act(() => {
        useSchoolStore.getState().setSearchQuery('test');
      });

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(mockSchoolService.getSchools).toHaveBeenCalledWith({ search: 'test' });
      expect(useSchoolStore.getState().schools).toEqual(searchResults);
    });

    it('should fetch all schools when search query is empty', async () => {
      const allSchools = mockSchoolData.createMany(5);
      mockSchoolService.getSchools.mockResolvedValue(allSchools);

      act(() => {
        useSchoolStore.getState().setSearchQuery('');
      });

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(mockSchoolService.getSchools).toHaveBeenCalledWith(undefined);
      expect(useSchoolStore.getState().schools).toEqual(allSchools);
    });

    it('should update search query', () => {
      act(() => {
        useSchoolStore.getState().setSearchQuery('test query');
      });

      expect(useSchoolStore.getState().searchQuery).toBe('test query');
    });

    it('should handle search with no results', async () => {
      mockSchoolService.getSchools.mockResolvedValue([]);

      act(() => {
        useSchoolStore.getState().setSearchQuery('nonexistent');
      });

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(useSchoolStore.getState().schools).toEqual([]);
    });

    it('should clear previous results when searching', async () => {
      const initialSchools = mockSchoolData.createMany(5);
      act(() => {
        useSchoolStore.setState({ schools: initialSchools });
      });

      const searchResults = mockSchoolData.createMany(2);
      mockSchoolService.getSchools.mockResolvedValue(searchResults);

      act(() => {
        useSchoolStore.getState().setSearchQuery('specific');
      });

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(useSchoolStore.getState().schools).toEqual(searchResults);
      expect(useSchoolStore.getState().schools).toHaveLength(2);
    });
  });

  describe('Class Filter', () => {
    it('should filter classes by school id', async () => {
      const filteredClasses = mockClassData.createMany(3, 'school-1');
      mockClassService.getClasses.mockResolvedValue(filteredClasses);

      await act(async () => {
        await useClassStore.getState().fetchClasses('school-1');
      });

      expect(mockClassService.getClasses).toHaveBeenCalledWith({ schoolId: 'school-1' });
      expect(useClassStore.getState().classes).toEqual(filteredClasses);
    });

    it('should fetch all classes when no school filter', async () => {
      const allClasses = mockClassData.createMany(5);
      mockClassService.getClasses.mockResolvedValue(allClasses);

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      expect(mockClassService.getClasses).toHaveBeenCalledWith(undefined);
      expect(useClassStore.getState().classes).toEqual(allClasses);
    });

    it('should set filter school id', () => {
      act(() => {
        useClassStore.getState().setFilterSchoolId('school-1');
      });

      expect(useClassStore.getState().filterSchoolId).toBe('school-1');
    });

    it('should clear filter school id', () => {
      act(() => {
        useClassStore.getState().setFilterSchoolId('school-1');
      });

      expect(useClassStore.getState().filterSchoolId).toBe('school-1');

      act(() => {
        useClassStore.getState().setFilterSchoolId(null);
      });

      expect(useClassStore.getState().filterSchoolId).toBeNull();
    });

    it('should use stored filter when fetching', async () => {
      const filteredClasses = mockClassData.createMany(2, 'school-2');
      mockClassService.getClasses.mockResolvedValue(filteredClasses);

      act(() => {
        useClassStore.getState().setFilterSchoolId('school-2');
      });

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      expect(mockClassService.getClasses).toHaveBeenCalledWith({ schoolId: 'school-2' });
    });

    it('should override stored filter with parameter', async () => {
      const filteredClasses = mockClassData.createMany(2, 'school-3');
      mockClassService.getClasses.mockResolvedValue(filteredClasses);

      act(() => {
        useClassStore.getState().setFilterSchoolId('school-1');
      });

      await act(async () => {
        await useClassStore.getState().fetchClasses('school-3');
      });

      expect(mockClassService.getClasses).toHaveBeenCalledWith({ schoolId: 'school-3' });
    });

    it('should handle filter with no results', async () => {
      mockClassService.getClasses.mockResolvedValue([]);

      await act(async () => {
        await useClassStore.getState().fetchClasses('school-999');
      });

      expect(useClassStore.getState().classes).toEqual([]);
    });
  });

  describe('Combined Search and Filter', () => {
    it('should maintain separate search and filter states', async () => {
      // Set school search query
      act(() => {
        useSchoolStore.getState().setSearchQuery('test school');
      });

      // Set class filter
      act(() => {
        useClassStore.getState().setFilterSchoolId('school-1');
      });

      expect(useSchoolStore.getState().searchQuery).toBe('test school');
      expect(useClassStore.getState().filterSchoolId).toBe('school-1');
    });

    it('should clear search without affecting filter', () => {
      act(() => {
        useSchoolStore.getState().setSearchQuery('test');
        useClassStore.getState().setFilterSchoolId('school-1');
      });

      act(() => {
        useSchoolStore.getState().setSearchQuery('');
      });

      expect(useSchoolStore.getState().searchQuery).toBe('');
      expect(useClassStore.getState().filterSchoolId).toBe('school-1');
    });

    it('should clear filter without affecting search', () => {
      act(() => {
        useSchoolStore.getState().setSearchQuery('test');
        useClassStore.getState().setFilterSchoolId('school-1');
      });

      act(() => {
        useClassStore.getState().setFilterSchoolId(null);
      });

      expect(useSchoolStore.getState().searchQuery).toBe('test');
      expect(useClassStore.getState().filterSchoolId).toBeNull();
    });
  });
});
