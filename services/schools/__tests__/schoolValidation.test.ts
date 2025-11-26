import { validateCreateSchool, validateUpdateSchool } from '../schoolValidation';
import { CreateSchoolDTO, UpdateSchoolDTO } from '@/types';

describe('School Validation', () => {
  describe('validateCreateSchool', () => {
    it('should pass validation for valid school data', () => {
      const data: CreateSchoolDTO = {
        name: 'Test School',
        address: '123 Test Street',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(0);
    });

    it('should fail when name is empty', () => {
      const data: CreateSchoolDTO = {
        name: '',
        address: '123 Test Street',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome da escola é obrigatório');
    });

    it('should fail when name has only whitespace', () => {
      const data: CreateSchoolDTO = {
        name: '   ',
        address: '123 Test Street',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome da escola é obrigatório');
    });

    it('should fail when name is too short', () => {
      const data: CreateSchoolDTO = {
        name: 'AB',
        address: '123 Test Street',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome deve ter pelo menos 3 caracteres');
    });

    it('should fail when address is empty', () => {
      const data: CreateSchoolDTO = {
        name: 'Test School',
        address: '',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('address');
      expect(errors[0].message).toBe('Endereço é obrigatório');
    });

    it('should fail when address has only whitespace', () => {
      const data: CreateSchoolDTO = {
        name: 'Test School',
        address: '   ',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('address');
    });

    it('should fail when address is too short', () => {
      const data: CreateSchoolDTO = {
        name: 'Test School',
        address: '1234',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('address');
      expect(errors[0].message).toBe('Endereço deve ter pelo menos 5 caracteres');
    });

    it('should return multiple errors for invalid data', () => {
      const data: CreateSchoolDTO = {
        name: '',
        address: '',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(2);
      expect(errors.some((e) => e.field === 'name')).toBe(true);
      expect(errors.some((e) => e.field === 'address')).toBe(true);
    });

    it('should trim whitespace before validation', () => {
      const data: CreateSchoolDTO = {
        name: '  Test School  ',
        address: '  123 Test Street  ',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(0);
    });

    it('should accept special characters in name', () => {
      const data: CreateSchoolDTO = {
        name: "School's Name - Test #1",
        address: '123 Test Street',
      };

      const errors = validateCreateSchool(data);
      expect(errors).toHaveLength(0);
    });
  });

  describe('validateUpdateSchool', () => {
    it('should pass validation for valid update data', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        name: 'Updated School',
        address: '456 Updated Street',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when only name is provided', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        name: 'Updated School',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when only address is provided', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        address: '456 Updated Street',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when no fields are provided', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(0);
    });

    it('should fail when name is empty string', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        name: '',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome não pode estar vazio');
    });

    it('should fail when name has only whitespace', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        name: '   ',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
    });

    it('should fail when name is too short', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        name: 'AB',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome deve ter pelo menos 3 caracteres');
    });

    it('should fail when address is empty string', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        address: '',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('address');
      expect(errors[0].message).toBe('Endereço não pode estar vazio');
    });

    it('should fail when address is too short', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        address: '1234',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('address');
    });

    it('should return multiple errors for invalid update data', () => {
      const data: UpdateSchoolDTO = {
        id: '1',
        name: 'AB',
        address: '123',
      };

      const errors = validateUpdateSchool(data);
      expect(errors).toHaveLength(2);
    });
  });
});
