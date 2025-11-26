import { act } from '@testing-library/react-native';
import { useSchoolStore } from '../useSchoolStore';
import { schoolService } from '@/services/schools';
import { mockSchoolData } from '../../__tests__/utils/testUtils';

jest.mock('@/services/schools');

const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;

describe('useSchoolStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSchoolStore.setState({
      schools: [],
      selectedSchool: null,
      isLoading: false,
      error: null,
      searchQuery: '',
    });
  });

  describe('fetchSchools', () => {
    it('should fetch schools successfully', async () => {
      const mockSchools = mockSchoolData.createMany(3);
      mockSchoolService.getSchools.mockResolvedValue(mockSchools);

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      const state = useSchoolStore.getState();
      expect(state.schools).toEqual(mockSchools);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set loading state while fetching', async () => {
      const mockSchools = mockSchoolData.createMany(2);
      mockSchoolService.getSchools.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockSchools), 100))
      );

      const fetchPromise = act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      // Check loading state is true during fetch
      expect(useSchoolStore.getState().isLoading).toBe(true);

      await fetchPromise;

      // Check loading state is false after fetch
      expect(useSchoolStore.getState().isLoading).toBe(false);
    });

    it('should fetch schools with search query', async () => {
      const mockSchools = mockSchoolData.createMany(1);
      mockSchoolService.getSchools.mockResolvedValue(mockSchools);

      act(() => {
        useSchoolStore.getState().setSearchQuery('test');
      });

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(mockSchoolService.getSchools).toHaveBeenCalledWith({ search: 'test' });
      expect(useSchoolStore.getState().schools).toEqual(mockSchools);
    });

    it('should handle fetch errors', async () => {
      mockSchoolService.getSchools.mockRejectedValue(new Error('Network error'));

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Network error');
      expect(state.isLoading).toBe(false);
      expect(state.schools).toEqual([]);
    });

    it('should clear previous error on new fetch', async () => {
      // Set initial error state
      act(() => {
        useSchoolStore.setState({ error: 'Previous error' });
      });

      const mockSchools = mockSchoolData.createMany(2);
      mockSchoolService.getSchools.mockResolvedValue(mockSchools);

      await act(async () => {
        await useSchoolStore.getState().fetchSchools();
      });

      expect(useSchoolStore.getState().error).toBeNull();
    });
  });

  describe('fetchSchoolById', () => {
    it('should fetch a single school by id', async () => {
      const mockSchool = mockSchoolData.create({ id: '1' });
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);

      await act(async () => {
        await useSchoolStore.getState().fetchSchoolById('1');
      });

      const state = useSchoolStore.getState();
      expect(state.selectedSchool).toEqual(mockSchool);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle fetch by id errors', async () => {
      mockSchoolService.getSchoolById.mockRejectedValue(new Error('School not found'));

      await act(async () => {
        await useSchoolStore.getState().fetchSchoolById('999');
      });

      const state = useSchoolStore.getState();
      expect(state.error).toBe('School not found');
      expect(state.selectedSchool).toBeNull();
    });
  });

  describe('createSchool', () => {
    it('should create a new school', async () => {
      const newSchoolData = { name: 'New School', address: '123 Test St' };
      const createdSchool = mockSchoolData.create(newSchoolData);
      mockSchoolService.createSchool.mockResolvedValue(createdSchool);

      await act(async () => {
        await useSchoolStore.getState().createSchool(newSchoolData);
      });

      const state = useSchoolStore.getState();
      expect(state.schools).toContainEqual(createdSchool);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should add school to existing list', async () => {
      const existingSchools = mockSchoolData.createMany(2);
      act(() => {
        useSchoolStore.setState({ schools: existingSchools });
      });

      const newSchoolData = { name: 'New School', address: '123 Test St' };
      const createdSchool = mockSchoolData.create({ id: '3', ...newSchoolData });
      mockSchoolService.createSchool.mockResolvedValue(createdSchool);

      await act(async () => {
        await useSchoolStore.getState().createSchool(newSchoolData);
      });

      const state = useSchoolStore.getState();
      expect(state.schools).toHaveLength(3);
      expect(state.schools[2]).toEqual(createdSchool);
    });

    it('should handle create errors and rethrow', async () => {
      const newSchoolData = { name: 'New School', address: '123 Test St' };
      mockSchoolService.createSchool.mockRejectedValue(new Error('Create failed'));

      await expect(
        act(async () => {
          await useSchoolStore.getState().createSchool(newSchoolData);
        })
      ).rejects.toThrow('Create failed');

      const state = useSchoolStore.getState();
      expect(state.error).toBe('Create failed');
      expect(state.schools).toEqual([]);
    });
  });

  describe('updateSchool', () => {
    it('should update an existing school', async () => {
      const schools = mockSchoolData.createMany(3);
      act(() => {
        useSchoolStore.setState({ schools });
      });

      const updateData = { id: '2', name: 'Updated School' };
      const updatedSchool = { ...schools[1], ...updateData };
      mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

      await act(async () => {
        await useSchoolStore.getState().updateSchool(updateData);
      });

      const state = useSchoolStore.getState();
      expect(state.schools[1]).toEqual(updatedSchool);
      expect(state.schools).toHaveLength(3);
    });

    it('should update selected school if it matches', async () => {
      const school = mockSchoolData.create({ id: '1' });
      act(() => {
        useSchoolStore.setState({
          schools: [school],
          selectedSchool: school,
        });
      });

      const updateData = { id: '1', name: 'Updated Name' };
      const updatedSchool = { ...school, ...updateData };
      mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

      await act(async () => {
        await useSchoolStore.getState().updateSchool(updateData);
      });

      const state = useSchoolStore.getState();
      expect(state.selectedSchool).toEqual(updatedSchool);
    });

    it('should not update selected school if different id', async () => {
      const schools = mockSchoolData.createMany(2);
      act(() => {
        useSchoolStore.setState({
          schools,
          selectedSchool: schools[0],
        });
      });

      const updateData = { id: '2', name: 'Updated School' };
      const updatedSchool = { ...schools[1], ...updateData };
      mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

      await act(async () => {
        await useSchoolStore.getState().updateSchool(updateData);
      });

      const state = useSchoolStore.getState();
      expect(state.selectedSchool).toEqual(schools[0]);
    });

    it('should handle update errors and rethrow', async () => {
      const updateData = { id: '1', name: 'Updated School' };
      mockSchoolService.updateSchool.mockRejectedValue(new Error('Update failed'));

      await expect(
        act(async () => {
          await useSchoolStore.getState().updateSchool(updateData);
        })
      ).rejects.toThrow('Update failed');

      expect(useSchoolStore.getState().error).toBe('Update failed');
    });
  });

  describe('deleteSchool', () => {
    it('should delete a school', async () => {
      const schools = mockSchoolData.createMany(3);
      act(() => {
        useSchoolStore.setState({ schools });
      });

      mockSchoolService.deleteSchool.mockResolvedValue();

      await act(async () => {
        await useSchoolStore.getState().deleteSchool('2');
      });

      const state = useSchoolStore.getState();
      expect(state.schools).toHaveLength(2);
      expect(state.schools.find((s) => s.id === '2')).toBeUndefined();
    });

    it('should clear selected school if it matches deleted id', async () => {
      const school = mockSchoolData.create({ id: '1' });
      act(() => {
        useSchoolStore.setState({
          schools: [school],
          selectedSchool: school,
        });
      });

      mockSchoolService.deleteSchool.mockResolvedValue();

      await act(async () => {
        await useSchoolStore.getState().deleteSchool('1');
      });

      const state = useSchoolStore.getState();
      expect(state.selectedSchool).toBeNull();
      expect(state.schools).toHaveLength(0);
    });

    it('should not clear selected school if different id', async () => {
      const schools = mockSchoolData.createMany(2);
      act(() => {
        useSchoolStore.setState({
          schools,
          selectedSchool: schools[0],
        });
      });

      mockSchoolService.deleteSchool.mockResolvedValue();

      await act(async () => {
        await useSchoolStore.getState().deleteSchool('2');
      });

      const state = useSchoolStore.getState();
      expect(state.selectedSchool).toEqual(schools[0]);
    });

    it('should handle delete errors and rethrow', async () => {
      mockSchoolService.deleteSchool.mockRejectedValue(new Error('Delete failed'));

      await expect(
        act(async () => {
          await useSchoolStore.getState().deleteSchool('1');
        })
      ).rejects.toThrow('Delete failed');

      expect(useSchoolStore.getState().error).toBe('Delete failed');
    });
  });

  describe('setSearchQuery', () => {
    it('should update search query', () => {
      act(() => {
        useSchoolStore.getState().setSearchQuery('test query');
      });

      expect(useSchoolStore.getState().searchQuery).toBe('test query');
    });

    it('should update search query multiple times', () => {
      act(() => {
        useSchoolStore.getState().setSearchQuery('first');
      });
      expect(useSchoolStore.getState().searchQuery).toBe('first');

      act(() => {
        useSchoolStore.getState().setSearchQuery('second');
      });
      expect(useSchoolStore.getState().searchQuery).toBe('second');
    });
  });

  describe('clearError', () => {
    it('should clear error message', () => {
      act(() => {
        useSchoolStore.setState({ error: 'Some error' });
      });

      expect(useSchoolStore.getState().error).toBe('Some error');

      act(() => {
        useSchoolStore.getState().clearError();
      });

      expect(useSchoolStore.getState().error).toBeNull();
    });
  });
});
