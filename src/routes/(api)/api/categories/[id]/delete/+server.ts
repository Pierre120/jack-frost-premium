import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteCategory } from '$lib/server/categories/delete';

// Delete a category from the database
export const POST = (async ({ params }) => {
	try {
		const category = await deleteCategory(params.id ?? '');
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
