import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getProduct } from '$lib/server/products/get';

// Get a product from the database
export const GET = (async ({ params }) => {
	try {
		const product = await getProduct(params.id ?? '');
		return json({
			success: true,
			product
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
