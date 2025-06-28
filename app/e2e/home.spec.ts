import { test, expect } from '@playwright/test';

test('navigate to movie detail page', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('heading', { name: 'Betsson Movies' })).toBeVisible();

    await page.getByAltText('Deadpool image').click();

    await expect(page).toHaveURL(/.*movies\/deadpool/);

    await expect(page.getByRole('heading', { name: 'Deadpool' })).toBeVisible();
});

test('404 page', async ({ page }) => {
    await page.goto('http://localhost:3000/movies/nonexistent-movie');

    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
});

test('search movies', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('heading', { name: 'Betsson Movies' })).toBeVisible();
    await expect(page.getByTestId('movie-item').first()).toBeVisible();

    const input = page.getByPlaceholder('Search');
    await input.fill('Dead');

    const movieCount = await page.getByTestId('movie-item').count();
    expect(movieCount).toBe(1);
});

test('filter movies', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('heading', { name: 'Betsson Movies' })).toBeVisible();
    await expect(page.getByTestId('movie-item').first()).toBeVisible();

    await page.getByTestId('filter-item').first().click()

    const movieCount = await page.getByTestId('movie-item').count();
    expect(movieCount).toBe(15);
});