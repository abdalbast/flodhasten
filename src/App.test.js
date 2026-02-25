import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/IntroAnimation', () => () => null);

test('renders app branding', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({}),
      text: async () => '',
    })
  );

  try {
    render(<App />);
    const headings = await screen.findAllByRole('heading', { name: /Flodhästen/i });
    expect(headings.length).toBeGreaterThan(0);
  } finally {
    global.fetch = originalFetch;
  }
});
