import React from 'react';
import { act } from '@testing-library/react-native';
import { useClassStore } from '@/store/useClassStore';
import { classService } from '@/services/classes';
import { schoolService } from '@/services/schools';
import { mockClassData, mockSchoolData } from '../utils/testUtils';
import { Shift } from '@/types';

jest.mock('@/services/classes');
jest.mock('@/services/schools');

const mockClassService = classService as jest.Mocked<typeof classService>;
const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;

describe('Create Class Flow', () => {
  const CURRENT_YEAR = new Date().getFullYear();

  beforeEach(() => {
    jest.clearAllMocks();
    useClassStore.setState({
      classes: [],
      selectedClass: null,
      isLoading: false,
      error: null,
      filterSchoolId: null,
    });
  });

  it('should create class successfully', async () => {
    const newClass = mockClassData.create({
      name: '1º Ano A',
      shift: Shift.MORNING,
      schoolYear: CURRENT_YEAR,
      schoolId: 'school-1',
    });

    const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 5 });

    mockClassService.createClass.mockResolvedValue(newClass);
    mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
    mockSchoolService.updateSchool.mockResolvedValue({
      ...mockSchool,
      classCount: 6,
    });

    await act(async () => {
      await useClassStore.getState().createClass({
        name: '1º Ano A',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      });
    });

    const state = useClassStore.getState();
    expect(state.classes).toContainEqual(newClass);
    expect(state.error).toBeNull();
  });

  it('should update school class count after creating class', async () => {
    const newClass = mockClassData.create({ schoolId: 'school-1' });
    const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 3 });

    mockClassService.createClass.mockResolvedValue(newClass);
    mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
    mockSchoolService.updateSchool.mockResolvedValue({
      ...mockSchool,
      classCount: 4,
    });

    await act(async () => {
      await useClassStore.getState().createClass({
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      });
    });

    expect(mockSchoolService.updateSchool).toHaveBeenCalledWith('school-1', {
      id: 'school-1',
      classCount: 4,
    });
  });

  it('should create class with different shifts', async () => {
    const shifts = [Shift.MORNING, Shift.AFTERNOON, Shift.EVENING];

    for (const shift of shifts) {
      const newClass = mockClassData.create({ shift });
      const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 0 });

      mockClassService.createClass.mockResolvedValue(newClass);
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue({
        ...mockSchool,
        classCount: 1,
      });

      await act(async () => {
        await useClassStore.getState().createClass({
          name: 'Test Class',
          shift,
          schoolYear: CURRENT_YEAR,
          schoolId: 'school-1',
        });
      });

      const state = useClassStore.getState();
      expect(state.classes[state.classes.length - 1].shift).toBe(shift);
    }
  });

  it('should handle validation errors during creation', async () => {
    mockClassService.createClass.mockRejectedValue(new Error('Nome da turma é obrigatório'));

    await expect(
      act(async () => {
        await useClassStore.getState().createClass({
          name: '',
          shift: Shift.MORNING,
          schoolYear: CURRENT_YEAR,
          schoolId: 'school-1',
        });
      })
    ).rejects.toThrow('Nome da turma é obrigatório');

    expect(useClassStore.getState().error).toBe('Nome da turma é obrigatório');
  });

  it('should handle network errors during creation', async () => {
    mockClassService.createClass.mockRejectedValue(new Error('Network error'));

    await expect(
      act(async () => {
        await useClassStore.getState().createClass({
          name: 'Test Class',
          shift: Shift.MORNING,
          schoolYear: CURRENT_YEAR,
          schoolId: 'school-1',
        });
      })
    ).rejects.toThrow('Network error');

    expect(useClassStore.getState().error).toBe('Network error');
  });

  it('should continue even if school count update fails', async () => {
    const newClass = mockClassData.create();

    mockClassService.createClass.mockResolvedValue(newClass);
    mockSchoolService.getSchoolById.mockRejectedValue(new Error('School not found'));

    await act(async () => {
      await useClassStore.getState().createClass({
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      });
    });

    const state = useClassStore.getState();
    expect(state.classes).toContainEqual(newClass);
    expect(state.error).toBeNull();
  });

  it('should add class to existing list', async () => {
    const existingClasses = mockClassData.createMany(2);
    act(() => {
      useClassStore.setState({ classes: existingClasses });
    });

    const newClass = mockClassData.create({ id: '3' });
    const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 2 });

    mockClassService.createClass.mockResolvedValue(newClass);
    mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
    mockSchoolService.updateSchool.mockResolvedValue({
      ...mockSchool,
      classCount: 3,
    });

    await act(async () => {
      await useClassStore.getState().createClass({
        name: 'Third Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      });
    });

    const state = useClassStore.getState();
    expect(state.classes).toHaveLength(3);
    expect(state.classes[2]).toEqual(newClass);
  });

  it('should set loading state during creation', async () => {
    const newClass = mockClassData.create();
    const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 0 });

    mockClassService.createClass.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(newClass), 100))
    );
    mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
    mockSchoolService.updateSchool.mockResolvedValue(mockSchool);

    const createPromise = act(async () => {
      await useClassStore.getState().createClass({
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      });
    });

    expect(useClassStore.getState().isLoading).toBe(true);

    await createPromise;

    expect(useClassStore.getState().isLoading).toBe(false);
  });
});
