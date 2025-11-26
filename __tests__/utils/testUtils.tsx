import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { School, Class, Shift } from '../../types';

// Mock Navigation Provider
const MockNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withNavigation?: boolean;
}

export function renderWithProviders(ui: ReactElement, options?: CustomRenderOptions) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (options?.withNavigation) {
      return <MockNavigationProvider>{children}</MockNavigationProvider>;
    }
    return <>{children}</>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
}

// Mock Data Generators
export const mockSchoolData = {
  create: (overrides?: Partial<School>): School => ({
    id: '1',
    name: 'Test School',
    address: '123 Test Street',
    classCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  createMany: (count: number): School[] => {
    return Array.from({ length: count }, (_, i) =>
      mockSchoolData.create({
        id: `${i + 1}`,
        name: `Test School ${i + 1}`,
        address: `${100 + i} Test Street`,
        classCount: Math.floor(Math.random() * 10),
      })
    );
  },
};

export const mockClassData = {
  create: (overrides?: Partial<Class>): Class => ({
    id: '1',
    name: '1º Ano A',
    schoolId: '1',
    shift: Shift.MORNING,
    schoolYear: 2024,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  createMany: (count: number, schoolId: string = '1'): Class[] => {
    const shifts: Shift[] = [Shift.MORNING, Shift.AFTERNOON, Shift.EVENING];
    return Array.from({ length: count }, (_, i) =>
      mockClassData.create({
        id: `${i + 1}`,
        name: `Turma ${i + 1}`,
        schoolId,
        shift: shifts[i % shifts.length],
        schoolYear: 2024,
      })
    );
  },
};

// Test Helpers
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

export const flushPromises = () => new Promise(setImmediate);

// Mock API Response Helpers
export const mockApiSuccess = <T,>(data: T) => ({
  ok: true,
  status: 200,
  json: async () => data,
});

export const mockApiError = (status: number = 500, message: string = 'Error') => ({
  ok: false,
  status,
  json: async () => ({ message }),
});

// Re-export everything from testing library
export * from '@testing-library/react-native';

// Export custom screen with accessibility helpers
export { screen } from '@testing-library/react-native';
