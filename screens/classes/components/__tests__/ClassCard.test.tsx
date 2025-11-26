import React from 'react';
import { ClassCard } from '../ClassCard';
import {
  renderWithProviders,
  screen,
  fireEvent,
  mockClassData,
} from '../../../../__tests__/utils/testUtils';

import { Shift } from '@/types';
import * as navigation from '@/navigation';

jest.mock('@/navigation', () => ({
  navigateToEditClass: jest.fn(),
}));

jest.mock('@/hooks/useProtectedAction', () => ({
  useProtectedAction: (callback: () => void) => callback,
}));

describe('ClassCard', () => {
  const mockNavigateToEditClass = navigation.navigateToEditClass as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render class name', () => {
    const classItem = mockClassData.create({ name: '1º Ano A' });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.getByText('1º Ano A')).toBeTruthy();
  });

  it('should render school year', () => {
    const classItem = mockClassData.create({ schoolYear: 2024 });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.getByText('2024')).toBeTruthy();
  });

  it('should render morning shift badge', () => {
    const classItem = mockClassData.create({ shift: Shift.MORNING });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.getByText('Manhã')).toBeTruthy();
  });

  it('should render afternoon shift badge', () => {
    const classItem = mockClassData.create({ shift: Shift.AFTERNOON });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.getByText('Tarde')).toBeTruthy();
  });

  it('should render evening shift badge', () => {
    const classItem = mockClassData.create({ shift: Shift.EVENING });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.getByText('Noite')).toBeTruthy();
  });

  it('should render school name when provided', () => {
    const classItem = mockClassData.create({ name: 'Test Class' });

    renderWithProviders(<ClassCard classItem={classItem} schoolName="Test School" />);

    expect(screen.getByText('Test School')).toBeTruthy();
  });

  it('should not render school name when not provided', () => {
    const classItem = mockClassData.create({ name: 'Test Class' });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.queryByText('Test School')).toBeNull();
  });

  it('should navigate to edit class when pressed', async () => {
    const classItem = mockClassData.create({ id: '123', schoolId: 'school-1', name: '1º Ano A' });

    renderWithProviders(<ClassCard classItem={classItem} />);

    const card = screen.getByLabelText('Turma 1º Ano A');
    fireEvent.press(card);

    expect(mockNavigateToEditClass).toHaveBeenCalledWith('123', 'school-1');
  });

  it('should have correct accessibility label without school name', () => {
    const classItem = mockClassData.create({ name: 'Test Class' });

    renderWithProviders(<ClassCard classItem={classItem} />);

    const card = screen.getByLabelText('Turma Test Class');
    expect(card).toBeTruthy();
  });

  it('should have correct accessibility label with school name', () => {
    const classItem = mockClassData.create({ name: 'Test Class' });

    renderWithProviders(<ClassCard classItem={classItem} schoolName="Test School" />);

    const card = screen.getByLabelText('Turma Test Class da Test School');
    expect(card).toBeTruthy();
  });

  it('should have correct accessibility hint', () => {
    const classItem = mockClassData.create({
      name: 'Test Class',
      shift: Shift.MORNING,
      schoolYear: 2024,
    });

    renderWithProviders(<ClassCard classItem={classItem} />);

    const card = screen.getByHintText(
      'Toque para editar a turma Test Class do turno Manhã, ano letivo 2024'
    );
    expect(card).toBeTruthy();
  });

  it('should have button accessibility role', () => {
    const classItem = mockClassData.create();

    renderWithProviders(<ClassCard classItem={classItem} />);

    const card = screen.getByRole('button');
    expect(card).toBeTruthy();
  });

  it('should render with long class name', () => {
    const classItem = mockClassData.create({
      name: 'Very Long Class Name That Should Be Truncated',
    });

    renderWithProviders(<ClassCard classItem={classItem} />);

    expect(screen.getByText('Very Long Class Name That Should Be Truncated')).toBeTruthy();
  });

  it('should render with long school name', () => {
    const classItem = mockClassData.create({ name: 'Test Class' });

    renderWithProviders(
      <ClassCard
        classItem={classItem}
        schoolName="Very Long School Name That Should Be Truncated"
      />
    );

    expect(screen.getByText('Very Long School Name That Should Be Truncated')).toBeTruthy();
  });

  it('should display all shift types correctly', () => {
    const shifts = [
      { shift: Shift.MORNING, label: 'Manhã' },
      { shift: Shift.AFTERNOON, label: 'Tarde' },
      { shift: Shift.EVENING, label: 'Noite' },
    ];

    shifts.forEach(({ shift, label }) => {
      const classItem = mockClassData.create({ shift });
      const { rerender } = renderWithProviders(<ClassCard classItem={classItem} />);

      expect(screen.getByText(label)).toBeTruthy();

      // Clean up for next iteration
      rerender(<></>);
    });
  });
});
