import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOrderNumber } from '$lib/server/orders/get';

// Get order number of a specific order from the database
export const GET = (async ({ params }) => {
	try {
		const order_number = await getOrderNumber(params.id ?? '');
		return json({
			success: true,
			order_number
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
