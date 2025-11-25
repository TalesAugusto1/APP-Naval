export enum Shift {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
}

export interface Class {
  id: string;
  name: string;
  shift: Shift;
  schoolYear: number;
  schoolId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassDTO {
  name: string;
  shift: Shift;
  schoolYear: number;
  schoolId: string;
}

export interface UpdateClassDTO {
  id: string;
  name?: string;
  shift?: Shift;
  schoolYear?: number;
}
