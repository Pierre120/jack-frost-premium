import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import addCategory from '$lib/server/categories/add';
import { getSimilarCategories } from '$lib/server/categories/get';

// Add a category to the database
export const POST = (async ({ request }) => {
	try {
		const { name, offerings } = await request.json();

		const simCategories = await getSimilarCategories(name);
		
		if(simCategories.length > 0) return json({success: false, error: 'Category already exists.' })
		await addCategory(name, offerings);
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
