import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/samples/products';
import type { Product } from '$lib/types/product';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/products');
	const { success, products } = await res.json();
	console.log(products); // for debugging purposes
	// const products: Product[] = await getProducts();
	if (success) {
		return {
			products: products  as Product[]
		};
	}

	throw error(404, 'Products not found');
}) satisfies PageServerLoad;
