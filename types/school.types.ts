export interface School {
  id: string;
  name: string;
  address: string;
  classCount: number;
  status: 'active' | 'inactive';
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
