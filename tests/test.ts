import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/'); // index/landing page

	// This test will fail since it has the a different text content for <h1> in the index/landing page
	// expect(await page.textContent('h1')).toBe('Welcome to SvelteKit'); // Jack Frost Premium Ice Cream Landing Page or

	// This test will pass since it has the same text content for <h1> in the index/landing page
	expect(await page.textContent('h1')).toBe('Jack Frost Premium Ice Cream Landing Page');
});
