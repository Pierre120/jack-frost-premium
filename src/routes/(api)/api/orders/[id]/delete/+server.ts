import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteOrder } from '$lib/server/orders/delete';

// Delete an order from the database
export const POST = (async ({ params, fetch }) => {
	try {
		const orderRes = await fetch(`/api/orders/${params.id}`);
		let order = await orderRes.json();
		console.log('In delete order', order);

		order = await deleteOrder(params.id ?? '');
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
