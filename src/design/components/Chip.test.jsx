import { render, screen } from '@testing-library/react';
import Chip from './Chip';

describe('Chip', () => {
  it('applies selected and tone classes', () => {
    render(<Chip selected tone="success">Ready</Chip>);
    const chip = screen.getByText('Ready');
    expect(chip).toHaveClass('fd-chip');
    expect(chip).toHaveClass('fd-chip-selected');
    expect(chip).toHaveClass('fd-chip-success');
  });
});
