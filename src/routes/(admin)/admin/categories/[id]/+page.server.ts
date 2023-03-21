import type { Category } from '$lib/types/category';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const categRes = await fetch(`/api/categories/${params.id}`);
	const category = await categRes.json();
	if (category.success) {
		return {
			category: category.category as Category
		};
	}
	throw error(404, 'Category not found');
}) satisfies PageServerLoad;

export const actions = {
	edit: async ({ request, fetch, params }) => {
		console.log('editing categories ---');
		const updatedCategory = Object.fromEntries(await request.formData());
		console.log('updated category:' + updatedCategory);

		const processedCateg = {
			name: updatedCategory.name as string,
			offerings: [] as { id: string; size_name: string; price: number }[]
		};
		console.log(updatedCategory[`size_name${0}`] || updatedCategory[`price${0}`]);

		try {
			for (
				let i = 0;
				updatedCategory[`offering_id${i}`] ||
				updatedCategory[`size_name${i}`] ||
				updatedCategory[`price${i}`];
				i++
			) {
				processedCateg.offerings = [
					...processedCateg.offerings,
					{
						id: updatedCategory[`offering_id${i}`] as string,
						size_name: updatedCategory[`size_name${i}`] as string,
						price: Number(+updatedCategory[`price${i}`])
					}
				];
			}
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal error occured');
		}

		console.log('processed categories:' + processedCateg);
		const res = await fetch(`/api/categories/${params.id}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(processedCateg)
		});
		const data = await res.json();
		if (data.success) {
			console.log('edited category');
			throw redirect(303, '/admin/categories');
		}
		throw error(500, 'Category not edited');
	}
} satisfies Actions;
