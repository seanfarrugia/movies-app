import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieListHeader } from './index';
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        name: 'Inception',
        genres: ['Sci-Fi', 'Thriller'],
        year: 2010,
        image: 'inception.jpg',
      },
      {
        name: 'Titanic',
        genres: ['Romance', 'Drama'],
        year: 1997,
        image: 'titanic.jpg',
      },
    ]),
  })
) as unknown as typeof fetch;

describe('MovieList Tests', () => {
    beforeEach(() => { vi.clearAllMocks(); });

    it('renders the header', async () => {
        const setSearch = vi.fn();
        render(<MovieListHeader title='Test Title' search='' setSearch={setSearch} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    });

    it('calls setSearch on input change', () => {
        const setSearch = vi.fn();

        render(<MovieListHeader title="Betsson Movies" search="" setSearch={setSearch} />);
        const input = screen.getByPlaceholderText('Search');

        fireEvent.change(input, { target: { value: 'Inception' } });

        expect(setSearch).toHaveBeenCalledWith('Inception');
    });
});