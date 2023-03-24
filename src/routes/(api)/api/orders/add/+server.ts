import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import addOrder from '$lib/server/orders/add';

// Add an order to a database
export const POST = (async ({ request }) => {
	try {
		const { name, contact, payment, total, details, items } = await request.json();
		const { id } = await addOrder(name, contact, payment, total, details, items);
		return json({ success: true, id });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
