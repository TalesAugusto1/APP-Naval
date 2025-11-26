import React from 'react';
import { act } from '@testing-library/react-native';
import { useSchoolStore } from '@/store/useSchoolStore';
import { schoolService } from '@/services/schools';
import { mockSchoolData } from '../utils/testUtils';

jest.mock('@/services/schools');

const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;

describe('Delete School Flow', () => {
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

  it('should delete school successfully', async () => {
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
    expect(state.error).toBeNull();
  });

  it('should clear selected school if deleted', async () => {
    const school = mockSchoolData.create({ id: '1' });
    act(() => {
      useSchoolStore.setState({ schools: [school], selectedSchool: school });
    });

    mockSchoolService.deleteSchool.mockResolvedValue();

    await act(async () => {
      await useSchoolStore.getState().deleteSchool('1');
    });

    const state = useSchoolStore.getState();
    expect(state.selectedSchool).toBeNull();
    expect(state.schools).toHaveLength(0);
  });

  it('should keep selected school if different id deleted', async () => {
    const schools = mockSchoolData.createMany(2);
    act(() => {
      useSchoolStore.setState({ schools, selectedSchool: schools[0] });
    });

    mockSchoolService.deleteSchool.mockResolvedValue();

    await act(async () => {
      await useSchoolStore.getState().deleteSchool('2');
    });

    const state = useSchoolStore.getState();
    expect(state.selectedSchool).toEqual(schools[0]);
    expect(state.schools).toHaveLength(1);
  });

  it('should handle network errors during delete', async () => {
    const schools = mockSchoolData.createMany(2);
    act(() => {
      useSchoolStore.setState({ schools });
    });

    mockSchoolService.deleteSchool.mockRejectedValue(new Error('Network error'));

    await expect(
      act(async () => {
        await useSchoolStore.getState().deleteSchool('1');
      })
    ).rejects.toThrow('Network error');

    const state = useSchoolStore.getState();
    expect(state.error).toBe('Network error');
    expect(state.schools).toHaveLength(2); // Should not delete on error
  });

  it('should handle not found errors during delete', async () => {
    const schools = mockSchoolData.createMany(2);
    act(() => {
      useSchoolStore.setState({ schools });
    });

    mockSchoolService.deleteSchool.mockRejectedValue(new Error('School not found'));

    await expect(
      act(async () => {
        await useSchoolStore.getState().deleteSchool('999');
      })
    ).rejects.toThrow('School not found');

    expect(useSchoolStore.getState().error).toBe('School not found');
  });

  it('should clear error before deleting', async () => {
    const schools = mockSchoolData.createMany(2);
    act(() => {
      useSchoolStore.setState({ schools, error: 'Previous error' });
    });

    mockSchoolService.deleteSchool.mockResolvedValue();

    await act(async () => {
      await useSchoolStore.getState().deleteSchool('1');
    });

    expect(useSchoolStore.getState().error).toBeNull();
  });

  it('should set loading state during delete', async () => {
    const schools = mockSchoolData.createMany(2);
    act(() => {
      useSchoolStore.setState({ schools });
    });

    mockSchoolService.deleteSchool.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(), 100))
    );

    const deletePromise = act(async () => {
      await useSchoolStore.getState().deleteSchool('1');
    });

    expect(useSchoolStore.getState().isLoading).toBe(true);

    await deletePromise;

    expect(useSchoolStore.getState().isLoading).toBe(false);
  });

  it('should delete first school in list', async () => {
    const schools = mockSchoolData.createMany(3);
    act(() => {
      useSchoolStore.setState({ schools });
    });

    mockSchoolService.deleteSchool.mockResolvedValue();

    await act(async () => {
      await useSchoolStore.getState().deleteSchool('1');
    });

    const state = useSchoolStore.getState();
    expect(state.schools).toHaveLength(2);
    expect(state.schools[0].id).toBe('2');
    expect(state.schools[1].id).toBe('3');
  });

  it('should delete last school in list', async () => {
    const schools = mockSchoolData.createMany(3);
    act(() => {
      useSchoolStore.setState({ schools });
    });

    mockSchoolService.deleteSchool.mockResolvedValue();

    await act(async () => {
      await useSchoolStore.getState().deleteSchool('3');
    });

    const state = useSchoolStore.getState();
    expect(state.schools).toHaveLength(2);
    expect(state.schools[0].id).toBe('1');
    expect(state.schools[1].id).toBe('2');
  });

  it('should delete only school in list', async () => {
    const school = mockSchoolData.create({ id: '1' });
    act(() => {
      useSchoolStore.setState({ schools: [school] });
    });

    mockSchoolService.deleteSchool.mockResolvedValue();

    await act(async () => {
      await useSchoolStore.getState().deleteSchool('1');
    });

    const state = useSchoolStore.getState();
    expect(state.schools).toHaveLength(0);
  });
});
