export interface School {
  id: string;
  name: string;
  address: string;
  classCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSchoolDTO {
  name: string;
  address: string;
}

export interface UpdateSchoolDTO {
  id: string;
  name?: string;
  address?: string;
  classCount?: number;
}
