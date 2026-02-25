import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('associates helper text with input', () => {
    render(<Input label="Word" helperText="Enter a Swedish word" />);

    const input = screen.getByLabelText('Word');
    const message = screen.getByText('Enter a Swedish word');

    expect(input).toHaveAttribute('aria-describedby', message.id);
  });

  it('renders clear control for search input and calls onClear', async () => {
    const onClear = jest.fn();

    render(
      <Input
        label="Search"
        variant="search"
        value="hej"
        readOnly
        clearable
        onClear={onClear}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
