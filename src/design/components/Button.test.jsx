import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('fires onClick when enabled', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Start</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables interaction while loading', async () => {
    const onClick = jest.fn();

    render(
      <Button loading onClick={onClick}>
        Start
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Start' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
