import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	// const categs = [
	// 	{ id: '1', name: 'Platinum' },
	// 	{ id: '2', name: 'Premium' },
	// 	{ id: '3', name: 'Super Premium' }
	// ];
	const res = await fetch('/api/categories');
	const categories = await res.json();

	if(categories.success) {
		return {
			categories: categories.categories
		};
	}
	throw error(404, 'Categories not found');
}) satisfies PageServerLoad;
