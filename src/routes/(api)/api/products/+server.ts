import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllProducts } from '$lib/server/products/get';

// Get all products from the database
export const GET = (async () => {
	try {
		const products = await getAllProducts();
		console.log('From API:');
		console.log(products);
		return json({
			success: true,
			products
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
