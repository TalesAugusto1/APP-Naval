import { CreateSchoolDTO, UpdateSchoolDTO } from '@/types';

interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateSchool(data: CreateSchoolDTO): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Nome da escola é obrigatório',
    });
  } else if (data.name.trim().length < 3) {
    errors.push({
      field: 'name',
      message: 'Nome deve ter pelo menos 3 caracteres',
    });
  }

  if (!data.address || data.address.trim().length === 0) {
    errors.push({
      field: 'address',
      message: 'Endereço é obrigatório',
    });
  } else if (data.address.trim().length < 5) {
    errors.push({
      field: 'address',
      message: 'Endereço deve ter pelo menos 5 caracteres',
    });
  }

  return errors;
}

export function validateUpdateSchool(data: UpdateSchoolDTO): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.name !== undefined) {
    if (data.name.trim().length === 0) {
      errors.push({
        field: 'name',
        message: 'Nome não pode estar vazio',
      });
    } else if (data.name.trim().length < 3) {
      errors.push({
        field: 'name',
        message: 'Nome deve ter pelo menos 3 caracteres',
      });
    }
  }

  if (data.address !== undefined) {
    if (data.address.trim().length === 0) {
      errors.push({
        field: 'address',
        message: 'Endereço não pode estar vazio',
      });
    } else if (data.address.trim().length < 5) {
      errors.push({
        field: 'address',
        message: 'Endereço deve ter pelo menos 5 caracteres',
      });
    }
  }

  return errors;
}
