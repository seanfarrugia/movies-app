import React from 'react';
import { render, screen } from '@testing-library/react';
import { Movie } from './index';
import { vi } from 'vitest';

describe('Movie Tests', () => {
    const movieData = {
        id: 1,
        description: 'test description',
        name: 'Inception',
        genres: ['Sci-Fi', 'Thriller'],
        year: 2010,
        rate: '4.8',
        slug: 'inception',
        length: '1hr 20mins',
        img: 'inception.jpg',
    }

    beforeEach(() => { vi.clearAllMocks(); });

    it('renders the correct movie data', async () => {
        render(<Movie {...movieData}  />);

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('4.8')).toBeInTheDocument();
        expect(screen.getByText('1hr 20mins')).toBeInTheDocument();
    });

    it('renders the correct movie image', async () => {
        render(<Movie {...movieData}  />);
        await expect(screen.findByAltText('Inception image')).resolves.toHaveAttribute('src', expect.stringContaining('inception.jpg'));
    });

    it('renders the correct movie link', async () => {
        render(<Movie {...movieData}  />);
        await expect(screen.findByRole('link', { name: /Inception image/i })).resolves.toHaveAttribute('href', '/movies/inception');
    });
});