import React from 'react';
import { render } from '@testing-library/react';
import Privacy from './privacy';
import Terms from './terms';

describe('Legal page snapshots', () => {
  let dateSpy;

  beforeAll(() => {
    dateSpy = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('01/01/2026');
  });

  afterAll(() => {
    dateSpy.mockRestore();
  });

  it('matches privacy snapshot', () => {
    const { asFragment } = render(<Privacy isDarkMode={false} onBack={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches terms snapshot', () => {
    const { asFragment } = render(<Terms isDarkMode={false} onBack={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
