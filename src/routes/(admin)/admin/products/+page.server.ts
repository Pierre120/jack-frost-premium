import type { Product } from '$lib/types/product';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const res = await fetch('/api/products');
	const products = await res.json();
	console.log(products); // for debugging purposes
	if (products.success) {
		return {
			products: products.products as Product[]
		};
	}
	throw error(404, 'Products not found');
}) satisfies PageServerLoad;
