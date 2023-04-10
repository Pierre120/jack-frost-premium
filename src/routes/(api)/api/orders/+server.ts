import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllOrders } from '$lib/server/orders/get';

// Get an order from the database
export const GET = (async () => {
	try {
		const orders = await getAllOrders();
		return json({
			success: true,
			orders
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
