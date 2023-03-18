import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import addCategory from '$lib/server/categories/add';

// Add a category to the database
export const POST = (async ({ request }) => {
	try {
		const category = await request.json();
		console.log('From Category add API: ', category);
		await addCategory(category);
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
