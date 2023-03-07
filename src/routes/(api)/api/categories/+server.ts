import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllCategories } from '$lib/server/categories/get';

// Get all categories from the database
export const GET = (async () => {
	try {
		const categories = await getAllCategories();
		console.log("From API:");
		console.log(categories);
		return json({
			success: true,
			categories
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
