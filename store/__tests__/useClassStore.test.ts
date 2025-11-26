import { act } from '@testing-library/react-native';
import { useClassStore } from '../useClassStore';
import { classService } from '@/services/classes';
import { schoolService } from '@/services/schools';
import { mockClassData, mockSchoolData } from '../../__tests__/utils/testUtils';
import { Shift } from '@/types';

jest.mock('@/services/classes');
jest.mock('@/services/schools');

const mockClassService = classService as jest.Mocked<typeof classService>;
const mockSchoolService = schoolService as jest.Mocked<typeof schoolService>;

describe('useClassStore', () => {
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

  describe('fetchClasses', () => {
    it('should fetch classes successfully', async () => {
      const mockClasses = mockClassData.createMany(3);
      mockClassService.getClasses.mockResolvedValue(mockClasses);

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      const state = useClassStore.getState();
      expect(state.classes).toEqual(mockClasses);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should fetch classes with schoolId parameter', async () => {
      const mockClasses = mockClassData.createMany(2, 'school-1');
      mockClassService.getClasses.mockResolvedValue(mockClasses);

      await act(async () => {
        await useClassStore.getState().fetchClasses('school-1');
      });

      expect(mockClassService.getClasses).toHaveBeenCalledWith({ schoolId: 'school-1' });
      expect(useClassStore.getState().classes).toEqual(mockClasses);
    });

    it('should fetch classes with stored filter', async () => {
      const mockClasses = mockClassData.createMany(2, 'school-2');
      mockClassService.getClasses.mockResolvedValue(mockClasses);

      act(() => {
        useClassStore.getState().setFilterSchoolId('school-2');
      });

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      expect(mockClassService.getClasses).toHaveBeenCalledWith({ schoolId: 'school-2' });
    });

    it('should set loading state while fetching', async () => {
      const mockClasses = mockClassData.createMany(2);
      mockClassService.getClasses.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockClasses), 100))
      );

      const fetchPromise = act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      expect(useClassStore.getState().isLoading).toBe(true);
      await fetchPromise;
      expect(useClassStore.getState().isLoading).toBe(false);
    });

    it('should handle fetch errors', async () => {
      mockClassService.getClasses.mockRejectedValue(new Error('Network error'));

      await act(async () => {
        await useClassStore.getState().fetchClasses();
      });

      const state = useClassStore.getState();
      expect(state.error).toBe('Network error');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('fetchClassById', () => {
    it('should fetch a single class by id', async () => {
      const mockClass = mockClassData.create({ id: '1' });
      mockClassService.getClassById.mockResolvedValue(mockClass);

      await act(async () => {
        await useClassStore.getState().fetchClassById('1');
      });

      const state = useClassStore.getState();
      expect(state.selectedClass).toEqual(mockClass);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle fetch by id errors', async () => {
      mockClassService.getClassById.mockRejectedValue(new Error('Class not found'));

      await act(async () => {
        await useClassStore.getState().fetchClassById('999');
      });

      const state = useClassStore.getState();
      expect(state.error).toBe('Class not found');
      expect(state.selectedClass).toBeNull();
    });
  });

  describe('createClass', () => {
    it('should create a new class', async () => {
      const newClassData = {
        name: '1º Ano A',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };
      const createdClass = mockClassData.create(newClassData);
      const mockSchool = mockSchoolData.create({ id: '1', classCount: 5 });

      mockClassService.createClass.mockResolvedValue(createdClass);
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue({
        ...mockSchool,
        classCount: 6,
      });

      await act(async () => {
        await useClassStore.getState().createClass(newClassData);
      });

      const state = useClassStore.getState();
      expect(state.classes).toContainEqual(createdClass);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should update school class count on create', async () => {
      const newClassData = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: 'school-1',
      };
      const createdClass = mockClassData.create(newClassData);
      const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 3 });

      mockClassService.createClass.mockResolvedValue(createdClass);
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue({
        ...mockSchool,
        classCount: 4,
      });

      await act(async () => {
        await useClassStore.getState().createClass(newClassData);
      });

      expect(mockSchoolService.updateSchool).toHaveBeenCalledWith('school-1', {
        id: 'school-1',
        classCount: 4,
      });
    });

    it('should continue even if school update fails', async () => {
      const newClassData = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };
      const createdClass = mockClassData.create(newClassData);

      mockClassService.createClass.mockResolvedValue(createdClass);
      mockSchoolService.getSchoolById.mockRejectedValue(new Error('School not found'));

      await act(async () => {
        await useClassStore.getState().createClass(newClassData);
      });

      const state = useClassStore.getState();
      expect(state.classes).toContainEqual(createdClass);
      expect(state.error).toBeNull();
    });

    it('should handle create errors and rethrow', async () => {
      const newClassData = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };
      mockClassService.createClass.mockRejectedValue(new Error('Create failed'));

      await expect(
        act(async () => {
          await useClassStore.getState().createClass(newClassData);
        })
      ).rejects.toThrow('Create failed');

      expect(useClassStore.getState().error).toBe('Create failed');
    });
  });

  describe('updateClass', () => {
    it('should update an existing class', async () => {
      const classes = mockClassData.createMany(3);
      act(() => {
        useClassStore.setState({ classes });
      });

      const updateData = { id: '2', name: 'Updated Class' };
      const updatedClass = { ...classes[1], ...updateData };
      mockClassService.updateClass.mockResolvedValue(updatedClass);

      await act(async () => {
        await useClassStore.getState().updateClass(updateData);
      });

      const state = useClassStore.getState();
      expect(state.classes[1]).toEqual(updatedClass);
      expect(state.classes).toHaveLength(3);
    });

    it('should update selected class if it matches', async () => {
      const classItem = mockClassData.create({ id: '1' });
      act(() => {
        useClassStore.setState({
          classes: [classItem],
          selectedClass: classItem,
        });
      });

      const updateData = { id: '1', name: 'Updated Name' };
      const updatedClass = { ...classItem, ...updateData };
      mockClassService.updateClass.mockResolvedValue(updatedClass);

      await act(async () => {
        await useClassStore.getState().updateClass(updateData);
      });

      const state = useClassStore.getState();
      expect(state.selectedClass).toEqual(updatedClass);
    });

    it('should handle update errors and rethrow', async () => {
      const updateData = { id: '1', name: 'Updated Class' };
      mockClassService.updateClass.mockRejectedValue(new Error('Update failed'));

      await expect(
        act(async () => {
          await useClassStore.getState().updateClass(updateData);
        })
      ).rejects.toThrow('Update failed');

      expect(useClassStore.getState().error).toBe('Update failed');
    });
  });

  describe('deleteClass', () => {
    it('should delete a class', async () => {
      const classes = mockClassData.createMany(3);
      act(() => {
        useClassStore.setState({ classes });
      });

      const mockSchool = mockSchoolData.create({ id: '1', classCount: 5 });
      mockClassService.deleteClass.mockResolvedValue();
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue({
        ...mockSchool,
        classCount: 4,
      });

      await act(async () => {
        await useClassStore.getState().deleteClass('2');
      });

      const state = useClassStore.getState();
      expect(state.classes).toHaveLength(2);
      expect(state.classes.find((c) => c.id === '2')).toBeUndefined();
    });

    it('should update school class count on delete', async () => {
      const classItem = mockClassData.create({ id: '1', schoolId: 'school-1' });
      act(() => {
        useClassStore.setState({ classes: [classItem] });
      });

      const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 5 });
      mockClassService.deleteClass.mockResolvedValue();
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue({
        ...mockSchool,
        classCount: 4,
      });

      await act(async () => {
        await useClassStore.getState().deleteClass('1');
      });

      expect(mockSchoolService.updateSchool).toHaveBeenCalledWith('school-1', {
        id: 'school-1',
        classCount: 4,
      });
    });

    it('should not allow negative class count', async () => {
      const classItem = mockClassData.create({ id: '1', schoolId: 'school-1' });
      act(() => {
        useClassStore.setState({ classes: [classItem] });
      });

      const mockSchool = mockSchoolData.create({ id: 'school-1', classCount: 0 });
      mockClassService.deleteClass.mockResolvedValue();
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue(mockSchool);

      await act(async () => {
        await useClassStore.getState().deleteClass('1');
      });

      expect(mockSchoolService.updateSchool).toHaveBeenCalledWith('school-1', {
        id: 'school-1',
        classCount: 0,
      });
    });

    it('should clear selected class if it matches deleted id', async () => {
      const classItem = mockClassData.create({ id: '1' });
      act(() => {
        useClassStore.setState({
          classes: [classItem],
          selectedClass: classItem,
        });
      });

      const mockSchool = mockSchoolData.create({ id: '1', classCount: 1 });
      mockClassService.deleteClass.mockResolvedValue();
      mockSchoolService.getSchoolById.mockResolvedValue(mockSchool);
      mockSchoolService.updateSchool.mockResolvedValue({
        ...mockSchool,
        classCount: 0,
      });

      await act(async () => {
        await useClassStore.getState().deleteClass('1');
      });

      const state = useClassStore.getState();
      expect(state.selectedClass).toBeNull();
    });

    it('should continue even if school update fails', async () => {
      const classItem = mockClassData.create({ id: '1' });
      act(() => {
        useClassStore.setState({ classes: [classItem] });
      });

      mockClassService.deleteClass.mockResolvedValue();
      mockSchoolService.getSchoolById.mockRejectedValue(new Error('School not found'));

      await act(async () => {
        await useClassStore.getState().deleteClass('1');
      });

      const state = useClassStore.getState();
      expect(state.classes).toHaveLength(0);
    });

    it('should handle delete errors and rethrow', async () => {
      mockClassService.deleteClass.mockRejectedValue(new Error('Delete failed'));

      await expect(
        act(async () => {
          await useClassStore.getState().deleteClass('1');
        })
      ).rejects.toThrow('Delete failed');

      expect(useClassStore.getState().error).toBe('Delete failed');
    });
  });

  describe('setFilterSchoolId', () => {
    it('should update filter school id', () => {
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
  });

  describe('clearError', () => {
    it('should clear error message', () => {
      act(() => {
        useClassStore.setState({ error: 'Some error' });
      });

      expect(useClassStore.getState().error).toBe('Some error');

      act(() => {
        useClassStore.getState().clearError();
      });

      expect(useClassStore.getState().error).toBeNull();
    });
  });
});
