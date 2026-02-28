import { render, screen } from '@testing-library/react';
import Surface from './Surface';

describe('Surface', () => {
  it('applies variant classes and renders children', () => {
    render(
      <Surface
        data-testid="surface"
        elevation="medium"
        padding="lg"
        bordered
        interactive
        tone="warning"
      >
        Card body
      </Surface>
    );

    expect(screen.getByText('Card body')).toBeInTheDocument();
    const node = screen.getByTestId('surface');
    expect(node).toHaveClass('fd-surface');
    expect(node).toHaveClass('fd-surface-elevation-medium');
    expect(node).toHaveClass('fd-surface-padded-lg');
    expect(node).toHaveClass('fd-surface-bordered');
    expect(node).toHaveClass('fd-surface-interactive');
    expect(node).toHaveClass('fd-surface-warning');
  });
});
