import React from 'react';
import { act } from '@testing-library/react-native';
import { useSchoolStore } from '@/store/useSchoolStore';
import { schoolService } from '@/services/schools';
import { mockSchoolData } from '../utils/testUtils';

jest.mock('@/services/schools');

const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;

describe('Edit School Flow', () => {
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

  it('should update school successfully', async () => {
    const existingSchool = mockSchoolData.create({ id: '1', name: 'Old Name' });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool], selectedSchool: existingSchool });
    });

    const updatedSchool = { ...existingSchool, name: 'New Name' };
    mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

    await act(async () => {
      await useSchoolStore.getState().updateSchool({
        id: '1',
        name: 'New Name',
      });
    });

    const state = useSchoolStore.getState();
    expect(state.schools[0].name).toBe('New Name');
    expect(state.selectedSchool?.name).toBe('New Name');
    expect(state.error).toBeNull();
  });

  it('should update school in list', async () => {
    const schools = mockSchoolData.createMany(3);
    act(() => {
      useSchoolStore.setState({ schools });
    });

    const updatedSchool = { ...schools[1], name: 'Updated Name' };
    mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

    await act(async () => {
      await useSchoolStore.getState().updateSchool({
        id: '2',
        name: 'Updated Name',
      });
    });

    const state = useSchoolStore.getState();
    expect(state.schools[1].name).toBe('Updated Name');
    expect(state.schools).toHaveLength(3);
  });

  it('should update only address', async () => {
    const existingSchool = mockSchoolData.create({ id: '1', address: 'Old Address' });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool] });
    });

    const updatedSchool = { ...existingSchool, address: 'New Address' };
    mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

    await act(async () => {
      await useSchoolStore.getState().updateSchool({
        id: '1',
        address: 'New Address',
      });
    });

    const state = useSchoolStore.getState();
    expect(state.schools[0].address).toBe('New Address');
  });

  it('should handle validation errors during update', async () => {
    const existingSchool = mockSchoolData.create({ id: '1' });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool] });
    });

    mockSchoolService.updateSchool.mockRejectedValue(new Error('Nome não pode estar vazio'));

    await expect(
      act(async () => {
        await useSchoolStore.getState().updateSchool({
          id: '1',
          name: '',
        });
      })
    ).rejects.toThrow('Nome não pode estar vazio');

    const state = useSchoolStore.getState();
    expect(state.error).toBe('Nome não pode estar vazio');
  });

  it('should handle network errors during update', async () => {
    const existingSchool = mockSchoolData.create({ id: '1' });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool] });
    });

    mockSchoolService.updateSchool.mockRejectedValue(new Error('Network error'));

    await expect(
      act(async () => {
        await useSchoolStore.getState().updateSchool({
          id: '1',
          name: 'New Name',
        });
      })
    ).rejects.toThrow('Network error');

    expect(useSchoolStore.getState().error).toBe('Network error');
  });

  it('should fetch school details before editing', async () => {
    const school = mockSchoolData.create({ id: '1' });
    mockSchoolService.getSchoolById.mockResolvedValue(school);

    await act(async () => {
      await useSchoolStore.getState().fetchSchoolById('1');
    });

    const state = useSchoolStore.getState();
    expect(state.selectedSchool).toEqual(school);
    expect(mockSchoolService.getSchoolById).toHaveBeenCalledWith('1');
  });

  it('should clear error before updating', async () => {
    const existingSchool = mockSchoolData.create({ id: '1' });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool], error: 'Previous error' });
    });

    const updatedSchool = { ...existingSchool, name: 'New Name' };
    mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

    await act(async () => {
      await useSchoolStore.getState().updateSchool({
        id: '1',
        name: 'New Name',
      });
    });

    expect(useSchoolStore.getState().error).toBeNull();
  });

  it('should set loading state during update', async () => {
    const existingSchool = mockSchoolData.create({ id: '1' });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool] });
    });

    const updatedSchool = { ...existingSchool, name: 'New Name' };
    mockSchoolService.updateSchool.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(updatedSchool), 100))
    );

    const updatePromise = act(async () => {
      await useSchoolStore.getState().updateSchool({
        id: '1',
        name: 'New Name',
      });
    });

    expect(useSchoolStore.getState().isLoading).toBe(true);

    await updatePromise;

    expect(useSchoolStore.getState().isLoading).toBe(false);
  });

  it('should update both name and address', async () => {
    const existingSchool = mockSchoolData.create({
      id: '1',
      name: 'Old Name',
      address: 'Old Address',
    });
    act(() => {
      useSchoolStore.setState({ schools: [existingSchool] });
    });

    const updatedSchool = { ...existingSchool, name: 'New Name', address: 'New Address' };
    mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

    await act(async () => {
      await useSchoolStore.getState().updateSchool({
        id: '1',
        name: 'New Name',
        address: 'New Address',
      });
    });

    const state = useSchoolStore.getState();
    expect(state.schools[0].name).toBe('New Name');
    expect(state.schools[0].address).toBe('New Address');
  });
});
