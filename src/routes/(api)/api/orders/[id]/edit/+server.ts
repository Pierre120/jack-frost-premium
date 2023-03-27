import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { editOrder } from '$lib/server/orders/edit';

// Edit an order in the database
export const POST: RequestHandler = async ({ params, request }) => {
	try {
		//TODO :  add variables here
		const { estimated_delivery, payment_status, amount_paid } = await request.json();
		const order = await editOrder(params.id ?? '', {
			estimated_delivery,
			payment_status,
			amount_paid
		});
		return json({
			success: true,
			order: await order // await the promise to get the actual value of order
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
};
