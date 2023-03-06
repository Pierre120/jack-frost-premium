import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCategory } from '$lib/server/categories/get';

// Get a category from the database
export const GET = (async ({ params }) => {
	try {
		const category = await getCategory(params.id ?? '');
		return json({
			success: true,
			category
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
