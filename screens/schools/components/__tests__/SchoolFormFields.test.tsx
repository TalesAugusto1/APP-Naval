import React from 'react';
import { SchoolFormFields } from '../SchoolFormFields';
import { renderWithProviders, screen, fireEvent } from '../../../../__tests__/utils/testUtils';

describe('SchoolFormFields', () => {
  const defaultProps = {
    name: '',
    address: '',
    errors: {},
    onChangeName: jest.fn(),
    onChangeAddress: jest.fn(),
    onBlurName: jest.fn(),
    onBlurAddress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render name and address fields', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} />);

    expect(screen.getByText('Nome da Escola')).toBeTruthy();
    expect(screen.getByText('Endereço')).toBeTruthy();
  });

  it('should render name input with placeholder', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} />);

    const nameInput = screen.getByPlaceholderText('Ex: Escola Municipal José de Alencar');
    expect(nameInput).toBeTruthy();
  });

  it('should render address input with placeholder', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} />);

    const addressInput = screen.getByPlaceholderText('Ex: Rua das Flores, 123 - Centro');
    expect(addressInput).toBeTruthy();
  });

  it('should display name value', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} name="Test School" />);

    const nameInput = screen.getByDisplayValue('Test School');
    expect(nameInput).toBeTruthy();
  });

  it('should display address value', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} address="123 Test Street" />);

    const addressInput = screen.getByDisplayValue('123 Test Street');
    expect(addressInput).toBeTruthy();
  });

  it('should call onChangeName when name input changes', () => {
    const onChangeName = jest.fn();
    renderWithProviders(<SchoolFormFields {...defaultProps} onChangeName={onChangeName} />);

    const nameInput = screen.getByPlaceholderText('Ex: Escola Municipal José de Alencar');
    fireEvent.changeText(nameInput, 'New School Name');

    expect(onChangeName).toHaveBeenCalledWith('New School Name');
  });

  it('should call onChangeAddress when address input changes', () => {
    const onChangeAddress = jest.fn();
    renderWithProviders(<SchoolFormFields {...defaultProps} onChangeAddress={onChangeAddress} />);

    const addressInput = screen.getByPlaceholderText('Ex: Rua das Flores, 123 - Centro');
    fireEvent.changeText(addressInput, 'New Address');

    expect(onChangeAddress).toHaveBeenCalledWith('New Address');
  });

  it('should call onBlurName when name input loses focus', () => {
    const onBlurName = jest.fn();
    renderWithProviders(<SchoolFormFields {...defaultProps} onBlurName={onBlurName} />);

    const nameInput = screen.getByLabelText('Nome da escola');
    fireEvent(nameInput, 'blur');

    expect(onBlurName).toHaveBeenCalled();
  });

  it('should call onBlurAddress when address input loses focus', () => {
    const onBlurAddress = jest.fn();
    renderWithProviders(<SchoolFormFields {...defaultProps} onBlurAddress={onBlurAddress} />);

    const addressInput = screen.getByLabelText('Endereço da escola');
    fireEvent(addressInput, 'blur');

    expect(onBlurAddress).toHaveBeenCalled();
  });

  it('should display name error message', () => {
    renderWithProviders(
      <SchoolFormFields {...defaultProps} errors={{ name: 'Nome é obrigatório' }} />
    );

    expect(screen.getByText('Nome é obrigatório')).toBeTruthy();
  });

  it('should display address error message', () => {
    renderWithProviders(
      <SchoolFormFields {...defaultProps} errors={{ address: 'Endereço é obrigatório' }} />
    );

    expect(screen.getByText('Endereço é obrigatório')).toBeTruthy();
  });

  it('should display multiple error messages', () => {
    renderWithProviders(
      <SchoolFormFields
        {...defaultProps}
        errors={{
          name: 'Nome é obrigatório',
          address: 'Endereço é obrigatório',
        }}
      />
    );

    expect(screen.getByText('Nome é obrigatório')).toBeTruthy();
    expect(screen.getByText('Endereço é obrigatório')).toBeTruthy();
  });

  it('should not display error messages when errors are empty', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} errors={{}} />);

    expect(screen.queryByText('Nome é obrigatório')).toBeNull();
    expect(screen.queryByText('Endereço é obrigatório')).toBeNull();
  });

  it('should have correct accessibility labels', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} />);

    expect(screen.getByLabelText('Nome da escola')).toBeTruthy();
    expect(screen.getByLabelText('Endereço da escola')).toBeTruthy();
  });

  it('should have correct accessibility hints', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} />);

    expect(screen.getByHintText('Digite o nome da escola')).toBeTruthy();
    expect(screen.getByHintText('Digite o endereço completo da escola')).toBeTruthy();
  });

  it('should handle empty string values', () => {
    renderWithProviders(<SchoolFormFields {...defaultProps} name="" address="" />);

    const nameInput = screen.getByPlaceholderText('Ex: Escola Municipal José de Alencar');
    const addressInput = screen.getByPlaceholderText('Ex: Rua das Flores, 123 - Centro');

    expect(nameInput.props.value).toBe('');
    expect(addressInput.props.value).toBe('');
  });

  it('should handle long text values', () => {
    const longName = 'A'.repeat(100);
    const longAddress = 'B'.repeat(200);

    renderWithProviders(
      <SchoolFormFields {...defaultProps} name={longName} address={longAddress} />
    );

    expect(screen.getByDisplayValue(longName)).toBeTruthy();
    expect(screen.getByDisplayValue(longAddress)).toBeTruthy();
  });

  it('should handle special characters in values', () => {
    const nameWithSpecialChars = "School's Name - Test #1";
    const addressWithSpecialChars = 'Rua José, 123 - 2º Andar';

    renderWithProviders(
      <SchoolFormFields
        {...defaultProps}
        name={nameWithSpecialChars}
        address={addressWithSpecialChars}
      />
    );

    expect(screen.getByDisplayValue(nameWithSpecialChars)).toBeTruthy();
    expect(screen.getByDisplayValue(addressWithSpecialChars)).toBeTruthy();
  });
});
