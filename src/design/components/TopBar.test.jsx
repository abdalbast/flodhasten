import { render, screen } from '@testing-library/react';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders string title and subtitle', () => {
    render(<TopBar title="Dashboard" subtitle="Overview" />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('supports non sticky mode', () => {
    render(<TopBar title="Static" sticky={false} />);
    expect(screen.getByRole('banner')).toHaveClass('fd-topbar-static');
  });
});
