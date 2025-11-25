import { CreateClassDTO, UpdateClassDTO, Shift } from '@/types';

interface ValidationError {
  field: string;
  message: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const VALID_SHIFTS = Object.values(Shift);

export function validateCreateClass(data: CreateClassDTO): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Nome da turma é obrigatório',
    });
  } else if (data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Nome deve ter pelo menos 2 caracteres',
    });
  }

  if (!data.shift || !VALID_SHIFTS.includes(data.shift)) {
    errors.push({
      field: 'shift',
      message: 'Turno inválido',
    });
  }

  if (!data.schoolYear) {
    errors.push({
      field: 'schoolYear',
      message: 'Ano letivo é obrigatório',
    });
  } else if (data.schoolYear < CURRENT_YEAR) {
    errors.push({
      field: 'schoolYear',
      message: 'Ano letivo não pode ser no passado',
    });
  } else if (data.schoolYear > CURRENT_YEAR + 5) {
    errors.push({
      field: 'schoolYear',
      message: 'Ano letivo muito distante no futuro',
    });
  }

  if (!data.schoolId || data.schoolId.trim().length === 0) {
    errors.push({
      field: 'schoolId',
      message: 'Escola é obrigatória',
    });
  }

  return errors;
}

export function validateUpdateClass(data: UpdateClassDTO): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.name !== undefined) {
    if (data.name.trim().length === 0) {
      errors.push({
        field: 'name',
        message: 'Nome não pode estar vazio',
      });
    } else if (data.name.trim().length < 2) {
      errors.push({
        field: 'name',
        message: 'Nome deve ter pelo menos 2 caracteres',
      });
    }
  }

  if (data.shift !== undefined && !VALID_SHIFTS.includes(data.shift)) {
    errors.push({
      field: 'shift',
      message: 'Turno inválido',
    });
  }

  if (data.schoolYear !== undefined) {
    if (data.schoolYear < CURRENT_YEAR) {
      errors.push({
        field: 'schoolYear',
        message: 'Ano letivo não pode ser no passado',
      });
    } else if (data.schoolYear > CURRENT_YEAR + 5) {
      errors.push({
        field: 'schoolYear',
        message: 'Ano letivo muito distante no futuro',
      });
    }
  }

  return errors;
}
