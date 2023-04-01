import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { editOrder } from '$lib/server/orders/edit';

// Edit an order in the database
export const POST: RequestHandler = async ({ params, request }) => {
	try {
		//TODO :  add variables here
		const { name, primary_contact, estimated_delivery, payment_status, amount_paid } = await request.json();
		const order = await editOrder(params.id ?? '', {
			name,
			primary_contact,
			estimated_delivery,
			payment_status,
			amount_paid
			// additional parameters here since the client wants the customer details to be modifiable 


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
