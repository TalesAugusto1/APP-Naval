import { schoolService } from '../schoolService';
import { apiClient } from '../../api/apiClient';
import { School, CreateSchoolDTO, UpdateSchoolDTO } from '@/types';
import { mockSchoolData } from '../../../__tests__/utils/testUtils';

jest.mock('../../api/apiClient');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('SchoolService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSchools', () => {
    it('should fetch all schools', async () => {
      const mockSchools = mockSchoolData.createMany(3);
      mockApiClient.get.mockResolvedValue({ data: mockSchools });

      const result = await schoolService.getSchools();

      expect(mockApiClient.get).toHaveBeenCalledWith('/schools');
      expect(result).toEqual(mockSchools);
    });

    it('should fetch schools with query parameters', async () => {
      const mockSchools = mockSchoolData.createMany(2);
      mockApiClient.get.mockResolvedValue({ data: mockSchools });

      const result = await schoolService.getSchools({ search: 'test' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/schools?search=test');
      expect(result).toEqual(mockSchools);
    });

    it('should handle API errors', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(schoolService.getSchools()).rejects.toThrow('Network error');
    });
  });

  describe('getSchoolById', () => {
    it('should fetch a school by id', async () => {
      const mockSchool = mockSchoolData.create({ id: '1' });
      mockApiClient.get.mockResolvedValue({ data: mockSchool });

      const result = await schoolService.getSchoolById('1');

      expect(mockApiClient.get).toHaveBeenCalledWith('/schools/1');
      expect(result).toEqual(mockSchool);
    });

    it('should handle not found errors', async () => {
      mockApiClient.get.mockRejectedValue(new Error('School not found'));

      await expect(schoolService.getSchoolById('999')).rejects.toThrow('School not found');
    });
  });

  describe('createSchool', () => {
    it('should create a new school', async () => {
      const createData: CreateSchoolDTO = {
        name: 'New School',
        address: '123 Test Street',
      };
      const mockCreatedSchool = mockSchoolData.create(createData);
      mockApiClient.post.mockResolvedValue({ data: mockCreatedSchool });

      const result = await schoolService.createSchool(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/schools', createData);
      expect(result).toEqual(mockCreatedSchool);
    });

    it('should throw validation error for invalid data', async () => {
      const invalidData: CreateSchoolDTO = {
        name: '',
        address: '123 Test Street',
      };

      await expect(schoolService.createSchool(invalidData)).rejects.toThrow(
        'Nome da escola é obrigatório'
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should throw validation error for missing address', async () => {
      const invalidData: CreateSchoolDTO = {
        name: 'Test School',
        address: '',
      };

      await expect(schoolService.createSchool(invalidData)).rejects.toThrow(
        'Endereço é obrigatório'
      );
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should throw validation error for short name', async () => {
      const invalidData: CreateSchoolDTO = {
        name: 'AB',
        address: '123 Test Street',
      };

      await expect(schoolService.createSchool(invalidData)).rejects.toThrow(
        'Nome deve ter pelo menos 3 caracteres'
      );
    });

    it('should throw multiple validation errors', async () => {
      const invalidData: CreateSchoolDTO = {
        name: '',
        address: '',
      };

      await expect(schoolService.createSchool(invalidData)).rejects.toThrow();
      expect(mockApiClient.post).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      const createData: CreateSchoolDTO = {
        name: 'Test School',
        address: '123 Test Street',
      };
      mockApiClient.post.mockRejectedValue(new Error('Server error'));

      await expect(schoolService.createSchool(createData)).rejects.toThrow('Server error');
    });
  });

  describe('updateSchool', () => {
    it('should update a school', async () => {
      const updateData: UpdateSchoolDTO = {
        id: '1',
        name: 'Updated School',
        address: '456 Updated Street',
      };
      const mockUpdatedSchool = mockSchoolData.create(updateData);
      mockApiClient.put.mockResolvedValue({ data: mockUpdatedSchool });

      const result = await schoolService.updateSchool('1', updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/schools/1', updateData);
      expect(result).toEqual(mockUpdatedSchool);
    });

    it('should update only name', async () => {
      const updateData: UpdateSchoolDTO = {
        id: '1',
        name: 'Updated School',
      };
      const mockUpdatedSchool = mockSchoolData.create(updateData);
      mockApiClient.put.mockResolvedValue({ data: mockUpdatedSchool });

      const result = await schoolService.updateSchool('1', updateData);

      expect(result).toEqual(mockUpdatedSchool);
    });

    it('should throw validation error for invalid update data', async () => {
      const invalidData: UpdateSchoolDTO = {
        id: '1',
        name: '',
      };

      await expect(schoolService.updateSchool('1', invalidData)).rejects.toThrow(
        'Nome não pode estar vazio'
      );
      expect(mockApiClient.put).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      const updateData: UpdateSchoolDTO = {
        id: '1',
        name: 'Updated School',
      };
      mockApiClient.put.mockRejectedValue(new Error('Update failed'));

      await expect(schoolService.updateSchool('1', updateData)).rejects.toThrow('Update failed');
    });
  });

  describe('deleteSchool', () => {
    it('should delete a school', async () => {
      mockApiClient.delete.mockResolvedValue({});

      await schoolService.deleteSchool('1');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/schools/1');
    });

    it('should handle deletion errors', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('Delete failed'));

      await expect(schoolService.deleteSchool('1')).rejects.toThrow('Delete failed');
    });
  });

  describe('searchSchools', () => {
    it('should search schools with query', async () => {
      const mockSchools = mockSchoolData.createMany(2);
      mockApiClient.get.mockResolvedValue({ data: mockSchools });

      const result = await schoolService.searchSchools('test query');

      expect(mockApiClient.get).toHaveBeenCalledWith('/schools?search=test%20query');
      expect(result).toEqual(mockSchools);
    });

    it('should handle empty search query', async () => {
      const mockSchools = mockSchoolData.createMany(5);
      mockApiClient.get.mockResolvedValue({ data: mockSchools });

      const result = await schoolService.searchSchools('');

      expect(mockApiClient.get).toHaveBeenCalledWith('/schools');
      expect(result).toEqual(mockSchools);
    });
  });
});
