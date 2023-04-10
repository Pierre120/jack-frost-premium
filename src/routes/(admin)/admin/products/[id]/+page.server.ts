import { productSchema } from '$lib/forms/validations/product';
import type { Category } from '$lib/types/category';
import type { Product } from '$lib/types/product';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const prodRes = await fetch(`/api/products/${params.id}`);
	const categRes = await fetch('/api/categories');
	const product = await prodRes.json();
	const categories = await categRes.json();
	if (product.success && categories.success) {
		return {
			product: product.product as Product,
			categories: categories.categories as Category[]
		};
	}
	throw error(404, 'Product not found');
}) satisfies PageServerLoad;

export const actions = {
	edit: async ({ request, fetch, params }) => {
		console.log('editing product ---');
		const updatedProduct = Object.fromEntries(await request.formData());
		console.log(updatedProduct);
		// Validate form data
		const result = productSchema.safeParse({
			name: updatedProduct.name,
			description: updatedProduct.description,
			img_path: updatedProduct.img_path,
			category_id: updatedProduct.category_id
		});
		if (!result.success) {
			console.log(result.error.flatten().fieldErrors);
			return fail(400, {
				data: {
					name: updatedProduct.name,
					description: updatedProduct.description,
					img_path: updatedProduct.img_path,
					img_src: updatedProduct.img_src,
					category_id: updatedProduct.category_id
				},
				errors: result.error.flatten().fieldErrors
			});
		}
		// Edit product
		const res = await fetch(`/api/products/${params.id}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedProduct)
		});
		const data = await res.json();
		if (data.success) {
			console.log('edited product');
			throw redirect(303, '/admin/products');
		} else if (!data.success) {
			// Fail to add product
			return fail(400, {
				data: {
					name: updatedProduct.name,
					description: updatedProduct.description,
					img_path: updatedProduct.img_path,
					img_src: updatedProduct.img_src,
					category_id: updatedProduct.category_id
				},
				dbFailed: true
			});
		}
		throw error(500, 'Product not edited');
	}
} satisfies Actions;
