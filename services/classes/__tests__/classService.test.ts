import { classService } from '../classService';
import { apiClient } from '../../api/apiClient';
import { CreateClassDTO, UpdateClassDTO, Shift } from '@/types';
import { mockClassData } from '../../../__tests__/utils/testUtils';

jest.mock('../../api/apiClient');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('ClassService', () => {
  const CURRENT_YEAR = new Date().getFullYear();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getClasses', () => {
    it('should fetch all classes', async () => {
      const mockClasses = mockClassData.createMany(3);
      mockApiClient.get.mockResolvedValue({ data: mockClasses });

      const result = await classService.getClasses();

      expect(mockApiClient.get).toHaveBeenCalledWith('/classes');
      expect(result).toEqual(mockClasses);
    });

    it('should fetch classes with schoolId filter', async () => {
      const mockClasses = mockClassData.createMany(2, '1');
      mockApiClient.get.mockResolvedValue({ data: mockClasses });

      const result = await classService.getClasses({ schoolId: '1' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/classes?schoolId=1');
      expect(result).toEqual(mockClasses);
    });

    it('should handle API errors', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(classService.getClasses()).rejects.toThrow('Network error');
    });
  });

  describe('getClassesBySchool', () => {
    it('should fetch classes for a specific school', async () => {
      const mockClasses = mockClassData.createMany(3, 'school-1');
      mockApiClient.get.mockResolvedValue({ data: mockClasses });

      const result = await classService.getClassesBySchool('school-1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/classes?schoolId=school-1');
      expect(result).toEqual(mockClasses);
    });
  });

  describe('getClassById', () => {
    it('should fetch a class by id', async () => {
      const mockClass = mockClassData.create({ id: '1' });
      mockApiClient.get.mockResolvedValue({ data: mockClass });

      const result = await classService.getClassById('1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/classes/1');
      expect(result).toEqual(mockClass);
    });

    it('should handle not found errors', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Class not found'));

      await expect(classService.getClassById('999')).rejects.toThrow('Class not found');
    });
  });

  describe('createClass', () => {
    it('should create a new class', async () => {
      const createData: CreateClassDTO = {
        name: '1º Ano A',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };
      const mockCreatedClass = mockClassData.create(createData);
      mockApiClient.post.mockResolvedValue({ data: mockCreatedClass });

      const result = await classService.createClass(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/classes', createData);
      expect(result).toEqual(mockCreatedClass);
    });

    it('should create class with different shifts', async () => {
      const shifts = [Shift.MORNING, Shift.AFTERNOON, Shift.EVENING];

      for (const shift of shifts) {
        const createData: CreateClassDTO = {
          name: 'Test Class',
          shift,
          schoolYear: CURRENT_YEAR,
          schoolId: '1',
        };
        const mockClass = mockClassData.create(createData);
        mockApiClient.post.mockResolvedValue({ data: mockClass });

        const result = await classService.createClass(createData);
        expect(result.shift).toBe(shift);
      }
    });

    it('should throw validation error for invalid name', async () => {
      const invalidData: CreateClassDTO = {
        name: '',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };

      await expect(classService.createClass(invalidData)).rejects.toThrow(
        'Nome da turma é obrigatório'
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should throw validation error for invalid shift', async () => {
      const invalidData: CreateClassDTO = {
        name: 'Test Class',
        shift: 'invalid' as Shift,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };

      await expect(classService.createClass(invalidData)).rejects.toThrow('Turno inválido');
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should throw validation error for past schoolYear', async () => {
      const invalidData: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR - 1,
        schoolId: '1',
      };

      await expect(classService.createClass(invalidData)).rejects.toThrow(
        'Ano letivo não pode ser no passado'
      );
    });

    it('should throw validation error for missing schoolId', async () => {
      const invalidData: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '',
      };

      await expect(classService.createClass(invalidData)).rejects.toThrow('Escola é obrigatória');
    });

    it('should handle API errors', async () => {
      const createData: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };
      mockApiClient.post.mockRejectedValue(new Error('Server error'));

      await expect(classService.createClass(createData)).rejects.toThrow('Server error');
    });
  });

  describe('updateClass', () => {
    it('should update a class', async () => {
      const updateData: UpdateClassDTO = {
        id: '1',
        name: 'Updated Class',
        shift: Shift.AFTERNOON,
        schoolYear: CURRENT_YEAR + 1,
      };
      const mockUpdatedClass = mockClassData.create(updateData);
      mockApiClient.put.mockResolvedValue({ data: mockUpdatedClass });

      const result = await classService.updateClass('1', updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/classes/1', updateData);
      expect(result).toEqual(mockUpdatedClass);
    });

    it('should update only name', async () => {
      const updateData: UpdateClassDTO = {
        id: '1',
        name: 'Updated Class',
      };
      const mockUpdatedClass = mockClassData.create(updateData);
      mockApiClient.put.mockResolvedValue({ data: mockUpdatedClass });

      const result = await classService.updateClass('1', updateData);

      expect(result.name).toBe('Updated Class');
    });

    it('should update only shift', async () => {
      const updateData: UpdateClassDTO = {
        id: '1',
        shift: Shift.EVENING,
      };
      const mockUpdatedClass = mockClassData.create({ ...updateData, shift: Shift.EVENING });
      mockApiClient.put.mockResolvedValue({ data: mockUpdatedClass });

      const result = await classService.updateClass('1', updateData);

      expect(result.shift).toBe(Shift.EVENING);
    });

    it('should throw validation error for invalid update data', async () => {
      const invalidData: UpdateClassDTO = {
        id: '1',
        name: '',
      };

      await expect(classService.updateClass('1', invalidData)).rejects.toThrow(
        'Nome não pode estar vazio'
      );
      expect(mockApiClient.put).not.toHaveBeenCalled();
    });

    it('should throw validation error for invalid shift', async () => {
      const invalidData: UpdateClassDTO = {
        id: '1',
        shift: 'invalid' as Shift,
      };

      await expect(classService.updateClass('1', invalidData)).rejects.toThrow('Turno inválido');
    });

    it('should handle API errors', async () => {
      const updateData: UpdateClassDTO = {
        id: '1',
        name: 'Updated Class',
      };
      mockApiClient.put.mockRejectedValue(new Error('Update failed'));

      await expect(classService.updateClass('1', updateData)).rejects.toThrow('Update failed');
    });
  });

  describe('deleteClass', () => {
    it('should delete a class', async () => {
      mockApiClient.delete.mockResolvedValue({});

      await classService.deleteClass('1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/classes/1');
    });

    it('should handle deletion errors', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('Delete failed'));

      await expect(classService.deleteClass('1')).rejects.toThrow('Delete failed');
    });
  });
});
