import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';
import type { RequestHandler } from '@sveltejs/kit';
import { findProduct } from '$lib/samples/products';

export const GET = (async ({ params }) => {
	// TODO: Replace with actual database retrieval

	// Sample retrieval of product from database
	const products = await findProduct(params.id ?? '');

	return json(products);
}) satisfies RequestHandler;
