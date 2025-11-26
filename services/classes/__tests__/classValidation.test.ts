import { validateCreateClass, validateUpdateClass } from '../classValidation';
import { CreateClassDTO, UpdateClassDTO, Shift } from '@/types';

describe('Class Validation', () => {
  const CURRENT_YEAR = new Date().getFullYear();

  describe('validateCreateClass', () => {
    it('should pass validation for valid class data', () => {
      const data: CreateClassDTO = {
        name: '1º Ano A',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should fail when name is empty', () => {
      const data: CreateClassDTO = {
        name: '',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome da turma é obrigatório');
    });

    it('should fail when name is too short', () => {
      const data: CreateClassDTO = {
        name: 'A',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome deve ter pelo menos 2 caracteres');
    });

    it('should fail when shift is invalid', () => {
      const data: CreateClassDTO = {
        name: 'Test Class',
        shift: 'invalid' as Shift,
        schoolYear: CURRENT_YEAR,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('shift');
      expect(errors[0].message).toBe('Turno inválido');
    });

    it('should accept all valid shifts', () => {
      const shifts = [Shift.MORNING, Shift.AFTERNOON, Shift.EVENING];

      shifts.forEach((shift) => {
        const data: CreateClassDTO = {
          name: 'Test Class',
          shift,
          schoolYear: CURRENT_YEAR,
          schoolId: '1',
        };

        const errors = validateCreateClass(data);
        expect(errors).toHaveLength(0);
      });
    });

    it('should fail when schoolYear is missing', () => {
      const data: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: undefined as any,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors.some((e) => e.field === 'schoolYear')).toBe(true);
      expect(errors.some((e) => e.message === 'Ano letivo é obrigatório')).toBe(true);
    });

    it('should fail when schoolYear is in the past', () => {
      const data: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR - 1,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('schoolYear');
      expect(errors[0].message).toBe('Ano letivo não pode ser no passado');
    });

    it('should fail when schoolYear is too far in the future', () => {
      const data: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR + 10,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('schoolYear');
      expect(errors[0].message).toBe('Ano letivo muito distante no futuro');
    });

    it('should accept schoolYear up to 5 years in future', () => {
      const data: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR + 5,
        schoolId: '1',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should fail when schoolId is empty', () => {
      const data: CreateClassDTO = {
        name: 'Test Class',
        shift: Shift.MORNING,
        schoolYear: CURRENT_YEAR,
        schoolId: '',
      };

      const errors = validateCreateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('schoolId');
      expect(errors[0].message).toBe('Escola é obrigatória');
    });

    it('should return multiple errors for invalid data', () => {
      const data: CreateClassDTO = {
        name: '',
        shift: 'invalid' as Shift,
        schoolYear: CURRENT_YEAR - 5,
        schoolId: '',
      };

      const errors = validateCreateClass(data);
      expect(errors.length).toBeGreaterThan(1);
      expect(errors.some((e) => e.field === 'name')).toBe(true);
      expect(errors.some((e) => e.field === 'shift')).toBe(true);
      expect(errors.some((e) => e.field === 'schoolYear')).toBe(true);
      expect(errors.some((e) => e.field === 'schoolId')).toBe(true);
    });
  });

  describe('validateUpdateClass', () => {
    it('should pass validation for valid update data', () => {
      const data: UpdateClassDTO = {
        id: '1',
        name: 'Updated Class',
        shift: Shift.AFTERNOON,
        schoolYear: CURRENT_YEAR + 1,
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when only name is provided', () => {
      const data: UpdateClassDTO = {
        id: '1',
        name: 'Updated Class',
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when only shift is provided', () => {
      const data: UpdateClassDTO = {
        id: '1',
        shift: Shift.EVENING,
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when only schoolYear is provided', () => {
      const data: UpdateClassDTO = {
        id: '1',
        schoolYear: CURRENT_YEAR + 2,
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation when no optional fields are provided', () => {
      const data: UpdateClassDTO = {
        id: '1',
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(0);
    });

    it('should fail when name is empty string', () => {
      const data: UpdateClassDTO = {
        id: '1',
        name: '',
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome não pode estar vazio');
    });

    it('should fail when name is too short', () => {
      const data: UpdateClassDTO = {
        id: '1',
        name: 'A',
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
      expect(errors[0].message).toBe('Nome deve ter pelo menos 2 caracteres');
    });

    it('should fail when shift is invalid', () => {
      const data: UpdateClassDTO = {
        id: '1',
        shift: 'invalid' as Shift,
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('shift');
      expect(errors[0].message).toBe('Turno inválido');
    });

    it('should fail when schoolYear is in the past', () => {
      const data: UpdateClassDTO = {
        id: '1',
        schoolYear: CURRENT_YEAR - 1,
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('schoolYear');
    });

    it('should fail when schoolYear is too far in future', () => {
      const data: UpdateClassDTO = {
        id: '1',
        schoolYear: CURRENT_YEAR + 10,
      };

      const errors = validateUpdateClass(data);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('schoolYear');
    });

    it('should return multiple errors for invalid update data', () => {
      const data: UpdateClassDTO = {
        id: '1',
        name: 'A',
        shift: 'invalid' as Shift,
        schoolYear: CURRENT_YEAR - 5,
      };

      const errors = validateUpdateClass(data);
      expect(errors.length).toBeGreaterThan(1);
    });
  });
});
