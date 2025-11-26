import { act } from '@testing-library/react-native';
import { useSchoolStore } from '@/store/useSchoolStore';
import { useClassStore } from '@/store/useClassStore';
import { schoolService } from '@/services/schools';
import { classService } from '@/services/classes';
import { mockSchoolData, mockClassData } from '../utils/testUtils';
import { CreateSchoolDTO, CreateClassDTO, Shift } from '@/types';

jest.mock('@/services/schools');
jest.mock('@/services/classes');

const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;
const mockClassService = classService as jest.Mocked<typeof classService>;

const CURRENT_YEAR = new Date().getFullYear();

describe('Network Error Handling Integration Tests', () => {
  describe('School Operations Error Handling', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      act(() => {
        useSchoolStore.setState({
          schools: [],
          selectedSchool: null,
          isLoading: false,
          error: null,
          searchQuery: '',
        });
      });
    });

    it('should handle network error when fetching schools', async () => {
      mockSchoolService.getSchools.mockRejectedValue(new Error('Network error'));

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Network error');
      expect(state.isLoading).toBe(false);
      expect(state.schools).toHaveLength(0);
    });

    it('should handle timeout error when fetching school by id', async () => {
      mockSchoolService.getSchoolById.mockRejectedValue(new Error('Request timeout'));

      await act(async () => {
        await useSchoolStore.getState().fetchSchoolById('school-1');
      });

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Request timeout');
      expect(state.selectedSchool).toBeNull();
    });

    it('should handle server error when creating school', async () => {
      const newSchoolData: CreateSchoolDTO = {
        name: 'New School',
        address: '123 Street',
      };

      mockSchoolService.createSchool.mockRejectedValue(new Error('Internal server error'));

      await expect(
        act(async () => {
          await useSchoolStore.getState().createSchool(newSchoolData);
        })
      ).rejects.toThrow('Internal server error');

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Internal server error');
      expect(state.schools).toHaveLength(0);
    });

    it('should handle network error when updating school', async () => {
      const school = mockSchoolData.create({ id: 'school-1' });
      act(() => {
        useSchoolStore.setState({ schools: [school] });
      });

      mockSchoolService.updateSchool.mockRejectedValue(new Error('Connection failed'));

      await expect(
        act(async () => {
          await useSchoolStore.getState().updateSchool({ id: 'school-1', name: 'Updated' });
        })
      ).rejects.toThrow('Connection failed');

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Connection failed');
      expect(state.schools[0].name).not.toBe('Updated'); // Not updated
    });

    it('should handle network error when deleting school', async () => {
      const school = mockSchoolData.create({ id: 'school-1' });
      act(() => {
        useSchoolStore.setState({ schools: [school] });
      });

      mockSchoolService.deleteSchool.mockRejectedValue(new Error('Network unreachable'));

      await expect(
        act(async () => {
          await useSchoolStore.getState().deleteSchool('school-1');
        })
      ).rejects.toThrow('Network unreachable');

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Network unreachable');
      expect(state.schools).toHaveLength(1); // Not deleted
    });

    it('should allow error recovery by clearing error', async () => {
      // Simulate error
      mockSchoolService.getSchools.mockRejectedValue(new Error('Network error'));
      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });
      expect(useSchoolStore.getState().error).toBe('Network error');

      // Clear error
      act(() => {
        useSchoolStore.getState().clearError();
      });

      expect(useSchoolStore.getState().error).toBeNull();
    });

    it('should allow retry after network error', async () => {
      // First attempt fails
      mockSchoolService.getSchools.mockRejectedValueOnce(new Error('Network error'));
      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });
      expect(useSchoolStore.getState().error).toBe('Network error');

      // Retry succeeds
      const schools = [mockSchoolData.create()];
      mockSchoolService.getSchools.mockResolvedValueOnce(schools);
      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      const state = useSchoolStore.getState();
      expect(state.error).toBeNull();
      expect(state.schools).toEqual(schools);
    });
  });

  describe('Class Operations Error Handling', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      act(() => {
        useClassStore.setState({
          classes: [],
          selectedClass: null,
          isLoading: false,
          error: null,
          filterSchoolId: null,
        });
      });
    });

    it('should handle network error when fetching classes', async () => {
      mockClassService.getClasses.mockRejectedValue(new Error('Network error'));

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      const state = useClassStore.getState();
      expect(state.error).toBe('Network error');
      expect(state.isLoading).toBe(false);
      expect(state.classes).toHaveLength(0);
    });

    it('should handle server error when creating class', async () => {
      const newClassData: CreateClassDTO = {
        name: 'Class 1A',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      };

      mockClassService.createClass.mockRejectedValue(new Error('Database error'));

      await expect(
        act(async () => {
          await useClassStore.getState().createClass(newClassData);
        })
      ).rejects.toThrow('Database error');

      const state = useClassStore.getState();
      expect(state.error).toBe('Database error');
      expect(state.classes).toHaveLength(0);
    });

    it('should handle network error when updating class', async () => {
      const classItem = mockClassData.create({ id: 'class-1' });
      act(() => {
        useClassStore.setState({ classes: [classItem] });
      });

      mockClassService.updateClass.mockRejectedValue(new Error('Connection timeout'));

      await expect(
        act(async () => {
          await useClassStore.getState().updateClass({ id: 'class-1', name: 'Updated' });
        })
      ).rejects.toThrow('Connection timeout');

      const state = useClassStore.getState();
      expect(state.error).toBe('Connection timeout');
      expect(state.classes[0].name).not.toBe('Updated');
    });

    it('should handle network error when deleting class', async () => {
      const classItem = mockClassData.create({ id: 'class-1' });
      act(() => {
        useClassStore.setState({ classes: [classItem] });
      });

      mockClassService.deleteClass.mockRejectedValue(new Error('Service unavailable'));

      await expect(
        act(async () => {
          await useClassStore.getState().deleteClass('class-1');
        })
      ).rejects.toThrow('Service unavailable');

      const state = useClassStore.getState();
      expect(state.error).toBe('Service unavailable');
      expect(state.classes).toHaveLength(1); // Not deleted
    });

    it('should handle unknown error types', async () => {
      mockClassService.getClasses.mockRejectedValue('String error');

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      const state = useClassStore.getState();
      expect(state.error).toBe('Unknown error');
    });

    it('should allow error recovery and retry for classes', async () => {
      // First attempt fails
      mockClassService.getClasses.mockRejectedValueOnce(new Error('Network error'));
      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });
      expect(useClassStore.getState().error).toBe('Network error');

      // Clear error
      act(() => {
        useClassStore.getState().clearError();
      });
      expect(useClassStore.getState().error).toBeNull();

      // Retry succeeds
      const classes = [mockClassData.create()];
      mockClassService.getClasses.mockResolvedValueOnce(classes);
      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      const state = useClassStore.getState();
      expect(state.error).toBeNull();
      expect(state.classes).toEqual(classes);
    });
  });

  describe('Error State Isolation', () => {
    it('should not affect class store when school store has error', async () => {
      mockSchoolService.getSchools.mockRejectedValue(new Error('School network error'));
      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      mockClassService.getClasses.mockResolvedValue([mockClassData.create()]);
      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      expect(useSchoolStore.getState().error).toBe('School network error');
      expect(useClassStore.getState().error).toBeNull();
      expect(useClassStore.getState().classes).toHaveLength(1);
    });

    it('should not affect school store when class store has error', async () => {
      mockClassService.getClasses.mockRejectedValue(new Error('Class network error'));
      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      mockSchoolService.getSchools.mockResolvedValue([mockSchoolData.create()]);
      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(useClassStore.getState().error).toBe('Class network error');
      expect(useSchoolStore.getState().error).toBeNull();
      expect(useSchoolStore.getState().schools).toHaveLength(1);
    });
  });
});
