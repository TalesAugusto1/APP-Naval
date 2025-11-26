import React from 'react';
import { EmptyState } from '../EmptyState';
import { renderWithProviders, screen, fireEvent } from '../../__tests__/utils/testUtils';

describe('EmptyState', () => {
  it('should render icon, title, and message', () => {
    renderWithProviders(
      <EmptyState icon="📚" title="No Schools" message="There are no schools to display" />
    );

    expect(screen.getByText('📚')).toBeTruthy();
    expect(screen.getByText('No Schools')).toBeTruthy();
    expect(screen.getByText('There are no schools to display')).toBeTruthy();
  });

  it('should render without action button when not provided', () => {
    renderWithProviders(
      <EmptyState icon="📚" title="No Schools" message="There are no schools to display" />
    );

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render action button when provided', () => {
    const onAction = jest.fn();

    renderWithProviders(
      <EmptyState
        icon="📚"
        title="No Schools"
        message="There are no schools to display"
        actionText="Add School"
        onAction={onAction}
      />
    );

    const button = screen.getByText('Add School');
    expect(button).toBeTruthy();
  });

  it('should call onAction when button is pressed', () => {
    const onAction = jest.fn();

    renderWithProviders(
      <EmptyState
        icon="📚"
        title="No Schools"
        message="There are no schools to display"
        actionText="Add School"
        onAction={onAction}
      />
    );

    const button = screen.getByText('Add School');
    fireEvent.press(button);

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('should render with different icons', () => {
    const { rerender } = renderWithProviders(
      <EmptyState icon="📚" title="Test" message="Message" />
    );

    expect(screen.getByText('📚')).toBeTruthy();

    rerender(<EmptyState icon="🏫" title="Test" message="Message" />);

    expect(screen.getByText('🏫')).toBeTruthy();
    expect(screen.queryByText('📚')).toBeNull();
  });

  it('should render with custom title and message', () => {
    renderWithProviders(
      <EmptyState icon="📋" title="Custom Title" message="This is a custom message" />
    );

    expect(screen.getByText('Custom Title')).toBeTruthy();
    expect(screen.getByText('This is a custom message')).toBeTruthy();
  });

  it('should not render action button when only actionText is provided', () => {
    renderWithProviders(
      <EmptyState
        icon="📚"
        title="No Schools"
        message="There are no schools to display"
        actionText="Add School"
      />
    );

    expect(screen.queryByText('Add School')).toBeNull();
  });

  it('should not render action button when only onAction is provided', () => {
    const onAction = jest.fn();

    renderWithProviders(
      <EmptyState
        icon="📚"
        title="No Schools"
        message="There are no schools to display"
        onAction={onAction}
      />
    );

    expect(screen.queryByRole('button')).toBeNull();
  });
});
