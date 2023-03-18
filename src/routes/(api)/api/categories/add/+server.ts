import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import addCategory from '$lib/server/categories/add';

// Add a category to the database
export const POST = (async ({ request }) => {
	try {
		const { category, offerings } = await request.json(); // { name, offerings}
		await addCategory(category, offerings); // { name, offerings}
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
