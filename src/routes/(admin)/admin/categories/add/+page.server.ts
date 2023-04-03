import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Category } from '$lib/types/category';

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

const validateCategory = async (category) => {
	const errors: { name: string[] | null; offerings: string[] | null } = {
		name: null,
		offerings: null
	};
	let success = true;
	// Validate category name
	if (category.name === '') {
		errors['name'] = ['Category name is required'];
		success = false;
	}
	if (category?.offerings.length === 0) {
		errors['offerings'] = ['Offerings are required'];
	} else {
		for (const offering of category.offerings) {
			if (offering.size_name === '' || offering.price == 0 || offering.price == '') {
				errors['offerings'] = ['Offerings is required'];
				success = false;
				break;
			}
		}
	}
	return {
		success,
		errors
	};
};

export const actions = {
	add: async ({ request, fetch }) => {
		console.log('adding categories ---');
		const category = Object.fromEntries(await request.formData());
		console.log(category);
		const processedCateg = {
			name: category.name as string,
			offerings: [] as { size_name: string; price: number }[]
		};
		console.log(category[`size_name${0}`] || category[`price${0}`]);
		for (let i = 0; category[`size_name${i}`] || category[`price${i}`]; i++) {
			processedCateg.offerings = [
				...processedCateg.offerings,
				{
					size_name: category[`size_name${i}`] as string,
					price: +category[`price${i}`]
				}
			];
		}
		console.log(JSON.stringify(processedCateg.offerings));
		// Validate category
		const result = await validateCategory(processedCateg);
		if (!result.success) {
			console.log(result.errors);
			return fail(400, {
				data: {
					name: processedCateg.name,
					offerings: processedCateg.offerings
				},
				errors: result.errors
			});
		}
		//console.log(Categ);
		const res = await fetch('/api/categories/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(processedCateg) // processedCateg
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
