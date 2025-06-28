import React from 'react';
import { render, screen } from '@testing-library/react';
import { MovieData } from './index';
import { CgScreen } from 'react-icons/cg';
import { vi } from 'vitest';

describe('Movie Data Item Tests', () => {
    beforeEach(() => { vi.clearAllMocks(); });

    it('renders the correct movie data item with Props', async () => {
        const { container } = render(<MovieData Icon={CgScreen} text='Test Data' />);

        expect(screen.getByText('Test Data')).toBeInTheDocument();
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});