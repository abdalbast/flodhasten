import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders title and subtitle', () => {
    render(<Card title="Title" subtitle="Subtitle">Content</Card>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
