import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}
	const res = await fetch(`/api/categories`);
	const categs = await res.json();
	console.log(categs);
	if (categs.success) {
		return {
			categs: categs.categories
		};
	}
	throw error(404, 'Categories not found');
}) satisfies PageServerLoad;
