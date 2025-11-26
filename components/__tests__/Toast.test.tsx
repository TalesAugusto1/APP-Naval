import React from 'react';
import { Toast } from '../Toast';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../__tests__/utils/testUtils';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render toast message', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="success" message="Operation successful" onDismiss={onDismiss} />
    );

    expect(screen.getByText('Operation successful')).toBeTruthy();
  });

  it('should render success toast', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="success" message="Success message" onDismiss={onDismiss} />
    );

    expect(screen.getByText('Success message')).toBeTruthy();
  });

  it('should render error toast', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="error" message="Error message" onDismiss={onDismiss} />
    );

    expect(screen.getByText('Error message')).toBeTruthy();
  });

  it('should render warning toast', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="warning" message="Warning message" onDismiss={onDismiss} />
    );

    expect(screen.getByText('Warning message')).toBeTruthy();
  });

  it('should render info toast', () => {
    const onDismiss = jest.fn();

    renderWithProviders(<Toast id="1" type="info" message="Info message" onDismiss={onDismiss} />);

    expect(screen.getByText('Info message')).toBeTruthy();
  });

  it('should call onDismiss when pressed', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="toast-1" type="success" message="Test message" onDismiss={onDismiss} />
    );

    const toast = screen.getByRole('alert');
    fireEvent.press(toast);

    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('should auto-dismiss after default duration', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="toast-1" type="success" message="Test message" onDismiss={onDismiss} />
    );

    expect(onDismiss).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);

    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('should auto-dismiss after custom duration', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast
        id="toast-1"
        type="success"
        message="Test message"
        duration={5000}
        onDismiss={onDismiss}
      />
    );

    jest.advanceTimersByTime(3000);
    expect(onDismiss).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);
    expect(onDismiss).toHaveBeenCalledWith('toast-1');
  });

  it('should not auto-dismiss before duration', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="toast-1" type="success" message="Test message" onDismiss={onDismiss} />
    );

    jest.advanceTimersByTime(2000);

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('should have correct accessibility label for success', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="success" message="Success message" onDismiss={onDismiss} />
    );

    expect(screen.getByLabelText('Sucesso: Success message')).toBeTruthy();
  });

  it('should have correct accessibility label for error', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="error" message="Error message" onDismiss={onDismiss} />
    );

    expect(screen.getByLabelText('Erro: Error message')).toBeTruthy();
  });

  it('should have correct accessibility label for warning', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="warning" message="Warning message" onDismiss={onDismiss} />
    );

    expect(screen.getByLabelText('Aviso: Warning message')).toBeTruthy();
  });

  it('should have correct accessibility label for info', () => {
    const onDismiss = jest.fn();

    renderWithProviders(<Toast id="1" type="info" message="Info message" onDismiss={onDismiss} />);

    expect(screen.getByLabelText('Informação: Info message')).toBeTruthy();
  });

  it('should have alert accessibility role', () => {
    const onDismiss = jest.fn();

    renderWithProviders(
      <Toast id="1" type="success" message="Test message" onDismiss={onDismiss} />
    );

    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('should clear timeout on unmount', () => {
    const onDismiss = jest.fn();

    const { unmount } = renderWithProviders(
      <Toast id="toast-1" type="success" message="Test message" onDismiss={onDismiss} />
    );

    unmount();

    jest.advanceTimersByTime(3000);

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('should handle different messages', () => {
    const onDismiss = jest.fn();

    const messages = [
      'Short message',
      'A much longer message that contains multiple words and details about what happened',
      'Message with special chars: @#$%',
      'Mensagem em português com acentuação',
    ];

    messages.forEach((message) => {
      const { unmount } = renderWithProviders(
        <Toast id="1" type="info" message={message} onDismiss={onDismiss} />
      );

      expect(screen.getByText(message)).toBeTruthy();

      unmount();
    });
  });
});
