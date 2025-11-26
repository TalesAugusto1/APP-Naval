import React from 'react';
import { SchoolCard } from '../SchoolCard';
import {
  renderWithProviders,
  screen,
  fireEvent,
  mockSchoolData,
} from '../../../../__tests__/utils/testUtils';

import * as navigation from '@/navigation';

jest.mock('@/navigation', () => ({
  navigateToSchoolDetail: jest.fn(),
}));

describe('SchoolCard', () => {
  const mockNavigateToSchoolDetail = navigation.navigateToSchoolDetail as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render school name', () => {
    const school = mockSchoolData.create({ name: 'Test School' });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('Test School')).toBeTruthy();
  });

  it('should render school address', () => {
    const school = mockSchoolData.create({ address: '123 Main Street' });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('123 Main Street')).toBeTruthy();
  });

  it('should render class count with singular form', () => {
    const school = mockSchoolData.create({ classCount: 1 });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('1 turma')).toBeTruthy();
  });

  it('should render class count with plural form', () => {
    const school = mockSchoolData.create({ classCount: 5 });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('5 turmas')).toBeTruthy();
  });

  it('should render class count zero', () => {
    const school = mockSchoolData.create({ classCount: 0 });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('0 turmas')).toBeTruthy();
  });

  it('should show active status badge for active schools', () => {
    const school = mockSchoolData.create({ status: 'active' });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('Ativo')).toBeTruthy();
  });

  it('should show inactive status badge for inactive schools', () => {
    const school = mockSchoolData.create({ status: 'inactive' });

    renderWithProviders(<SchoolCard school={school} />);

    expect(screen.getByText('Inativo')).toBeTruthy();
  });

  it('should navigate to school detail when pressed', () => {
    const school = mockSchoolData.create({ id: '123', name: 'Test School' });

    renderWithProviders(<SchoolCard school={school} />);

    const card = screen.getByLabelText('Escola Test School');
    fireEvent.press(card);

    expect(mockNavigateToSchoolDetail).toHaveBeenCalledWith('123');
  });

  it('should have correct accessibility label', () => {
    const school = mockSchoolData.create({ name: 'Test School', classCount: 5 });

    renderWithProviders(<SchoolCard school={school} />);

    const card = screen.getByLabelText('Escola Test School');
    expect(card).toBeTruthy();
  });

  it('should have correct accessibility hint with singular class', () => {
    const school = mockSchoolData.create({ name: 'Test School', classCount: 1 });

    renderWithProviders(<SchoolCard school={school} />);

    const card = screen.getByHintText('Toque para ver detalhes da escola Test School com 1 turma');
    expect(card).toBeTruthy();
  });

  it('should have correct accessibility hint with plural classes', () => {
    const school = mockSchoolData.create({ name: 'Test School', classCount: 5 });

    renderWithProviders(<SchoolCard school={school} />);

    const card = screen.getByHintText('Toque para ver detalhes da escola Test School com 5 turmas');
    expect(card).toBeTruthy();
  });

  it('should have button accessibility role', () => {
    const school = mockSchoolData.create();

    renderWithProviders(<SchoolCard school={school} />);

    const card = screen.getByRole('button');
    expect(card).toBeTruthy();
  });

  it('should render with long school name', () => {
    const school = mockSchoolData.create({
      name: 'Very Long School Name That Should Be Truncated When Displayed',
    });

    renderWithProviders(<SchoolCard school={school} />);

    expect(
      screen.getByText('Very Long School Name That Should Be Truncated When Displayed')
    ).toBeTruthy();
  });

  it('should render with long address', () => {
    const school = mockSchoolData.create({
      address: 'Very Long Address That Might Span Multiple Lines, 123 - District - City - State',
    });

    renderWithProviders(<SchoolCard school={school} />);

    expect(
      screen.getByText(
        'Very Long Address That Might Span Multiple Lines, 123 - District - City - State'
      )
    ).toBeTruthy();
  });
});
