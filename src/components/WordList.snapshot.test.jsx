import React from 'react';
import { render } from '@testing-library/react';
import WordList from './WordList';

describe('WordList snapshots', () => {
  it('matches snapshot with sample words', () => {
    const words = [
      { swedish: 'hej', english: 'hello', stats: { correct: 2, incorrect: 1, lastPracticed: null } },
      { swedish: 'vatten', english: '(unknown)', stats: { correct: 0, incorrect: 0, lastPracticed: null } }
    ];

    const { asFragment } = render(
      <WordList
        words={words}
        skillWords={[words[0]]}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onImportWords={jest.fn()}
        onAdd={jest.fn()}
        isDarkMode={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
