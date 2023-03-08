import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const res = await event.fetch(`/api/categories`);
	const categs = await res.json();
	console.log(categs);
	if (categs.success) {
		return {
			categs: categs.categories
		};
	}
	throw error(404, 'Categories not found');
}) satisfies PageServerLoad;
