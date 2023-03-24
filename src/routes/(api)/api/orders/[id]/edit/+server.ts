import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { editOrder } from '$lib/server/orders/edit';

// Edit an order in the database
export const POST = (async ({ params, request }) => {
	try {
		//TODO :  add variables here
		const { estimated_delivery, payment_status } = await request.json();
		const order = await editOrder(params.id ?? '', {
			estimated_delivery,
			payment_status
		});
		return json({
			success: true,
			order
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
