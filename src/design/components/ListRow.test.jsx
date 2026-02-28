import { render, screen } from '@testing-library/react';
import ListRow from './ListRow';

describe('ListRow', () => {
  it('renders title and subtitle', () => {
    render(<ListRow title="Row title" subtitle="Row subtitle" />);
    expect(screen.getByText('Row title')).toBeInTheDocument();
    expect(screen.getByText('Row subtitle')).toBeInTheDocument();
  });
});
