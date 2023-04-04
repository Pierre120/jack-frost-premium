import type { Order } from '$lib/types/order';
import type { Actions, PageServerLoad } from './$types';
import { fail, error, redirect } from '@sveltejs/kit';
import { z } from 'zod';


export const load = (async ({ locals, params, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const orderRes = await fetch(`/api/orders/${params.id}`);
	const order = await orderRes.json();
	if (order.success) {
		return {
			order: order.order as Order
		};
	}
	console.log('ORDERS GOING TO edit.svelte:', order);
	throw error(404, 'Order not found');
}) satisfies PageServerLoad;

const orderSchema = z.object({
	payment_status: z.string({ required_error: 'Payment Status is required'}).min(1, { message: 'Payment Status is required' }),
	estimated_delivery: z.string({ required_error: 'Estimated Delivery Date is required'}).min(1, { message: 'Estimated Delivery Date is required' }),
	amount_paid: z.string({ required_error: 'Amount Paid is required'}).min(1, { message: 'Amount Paid is required' })
	
});
	

export const actions = {
	edit: async ({ request, fetch, params }) => {
		console.log('editing order ---');
		const formData = Object.fromEntries(await request.formData());
		
		console.log(formData);
		const res = await fetch(`/api/orders/${params.id}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});
		const data = await res.json();
		if (data.success) {
			console.log('edited order', res);
			throw redirect(303, '/admin/orders');
		}
		throw error(500, 'Order not edited');
	}
} satisfies Actions;
