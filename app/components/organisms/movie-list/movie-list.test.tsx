import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MovieList } from './index';
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

    it('renders the header and loads movies from API', async () => {
        render(<MovieList />);

        await waitFor(() => {
            expect(screen.getByText('Inception')).toBeInTheDocument();
            expect(screen.getByText('Titanic')).toBeInTheDocument();
        });
    });

    it('filters movies by search input', async () => {
        render(<MovieList />);

        const searchInput = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchInput, { target: { value: 'Titanic' } });

        await waitFor(() => {
            expect(screen.queryByText('Inception')).not.toBeInTheDocument();
            expect(screen.getByText('Titanic')).toBeInTheDocument();
        });
    });

    it('filters movies by genre', async () => {
        render(<MovieList />);
        await waitFor(() => screen.getByText('Inception'));

        const genreButton = screen.getByRole('button', { name: 'Sci-Fi' });
        fireEvent.click(genreButton);

        expect(screen.getByText(/Movies Found: 1/)).toBeInTheDocument();
        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.queryByText('Titanic')).not.toBeInTheDocument();
    });

    it('removes filters and search when clicking "Remove All Filters"', async () => {
        render(<MovieList />);
        await waitFor(() => screen.getByText('Inception'));

        fireEvent.click(screen.getByRole('button', { name: 'Drama' }));
        const searchInput = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchInput, { target: { value: 'Titanic' } });

        fireEvent.click(screen.getByRole('button', { name: /Remove All Filters/i }));

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('Titanic')).toBeInTheDocument();
    });
});
