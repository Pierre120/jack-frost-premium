import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/samples/products';
import type { Product } from '$lib/types/product';

export const load = (async () => {
	const products: Product[] = await getProducts();
	if (products) {
		return {
			products
		};
	}

	throw error(404, 'Products not found');
}) satisfies PageServerLoad;
