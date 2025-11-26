import React from 'react';
import { act } from '@testing-library/react-native';
import { renderWithProviders, screen, fireEvent, mockSchoolData } from '../utils/testUtils';
import { useSchoolStore } from '@/store/useSchoolStore';
import { schoolService } from '@/services/schools';

import * as navigation from '@/navigation';

jest.mock('@/services/schools');
jest.mock('@/navigation');

const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;
const mockRouter = {
  back: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
};

describe('Create School Flow', () => {
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

  it('should create school from start to finish', async () => {
    const newSchool = mockSchoolData.create({
      name: 'New School',
      address: '123 New Street',
    });

    mockSchoolService.createSchool.mockResolvedValue(newSchool);

    // Simulate form submission
    const createData = {
      name: 'New School',
      address: '123 New Street',
    };

    await act(async () => {
      await useSchoolStore.getState().createSchool(createData);
    });

    const state = useSchoolStore.getState();
    expect(state.schools).toContainEqual(newSchool);
    expect(state.error).toBeNull();
    expect(mockSchoolService.createSchool).toHaveBeenCalledWith(createData);
  });

  it('should handle validation errors during creation', async () => {
    mockSchoolService.createSchool.mockRejectedValue(new Error('Nome é obrigatório'));

    const invalidData = {
      name: '',
      address: '123 New Street',
    };

    await expect(
      act(async () => {
        await useSchoolStore.getState().createSchool(invalidData);
      })
    ).rejects.toThrow('Nome é obrigatório');

    const state = useSchoolStore.getState();
    expect(state.error).toBe('Nome é obrigatório');
    expect(state.schools).toHaveLength(0);
  });

  it('should handle network errors during creation', async () => {
    mockSchoolService.createSchool.mockRejectedValue(new Error('Network error'));

    const createData = {
      name: 'New School',
      address: '123 New Street',
    };

    await expect(
      act(async () => {
        await useSchoolStore.getState().createSchool(createData);
      })
    ).rejects.toThrow('Network error');

    const state = useSchoolStore.getState();
    expect(state.error).toBe('Network error');
    expect(state.schools).toHaveLength(0);
  });

  it('should add new school to existing list', async () => {
    const existingSchools = mockSchoolData.createMany(2);
    act(() => {
      useSchoolStore.setState({ schools: existingSchools });
    });

    const newSchool = mockSchoolData.create({ id: '3', name: 'Third School' });
    mockSchoolService.createSchool.mockResolvedValue(newSchool);

    await act(async () => {
      await useSchoolStore.getState().createSchool({
        name: 'Third School',
        address: '789 Third Street',
      });
    });

    const state = useSchoolStore.getState();
    expect(state.schools).toHaveLength(3);
    expect(state.schools[2]).toEqual(newSchool);
  });

  it('should clear error before creating new school', async () => {
    act(() => {
      useSchoolStore.setState({ error: 'Previous error' });
    });

    const newSchool = mockSchoolData.create();
    mockSchoolService.createSchool.mockResolvedValue(newSchool);

    await act(async () => {
      await useSchoolStore.getState().createSchool({
        name: 'New School',
        address: '123 New Street',
      });
    });

    expect(useSchoolStore.getState().error).toBeNull();
  });

  it('should set loading state during creation', async () => {
    const newSchool = mockSchoolData.create();
    mockSchoolService.createSchool.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(newSchool), 100))
    );

    const createPromise = act(async () => {
      await useSchoolStore.getState().createSchool({
        name: 'New School',
        address: '123 New Street',
      });
    });

    // Should be loading during async operation
    expect(useSchoolStore.getState().isLoading).toBe(true);

    await createPromise;

    // Should not be loading after completion
    expect(useSchoolStore.getState().isLoading).toBe(false);
  });
});
