import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const res = await fetch('/api/categories');
	const categories = await res.json();

	if (categories.success) {
		return {
			categories: categories.categories
		};
	}

	throw error(404, 'Categories not found');
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch }) => {
		console.log('adding categories ---');
		const category = Object.fromEntries(await request.formData());
		console.log(category);
		const res = await fetch('/api/categories/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(category)
		});
		const data = await res.json();
		console.log(data);
		if (data.success) {
			console.log('added category');
			throw redirect(303, '/admin/categories');
		}
		throw error(500, 'Category not added');
	}
} satisfies Actions;