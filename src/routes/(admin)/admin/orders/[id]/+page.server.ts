import type { Order } from '$lib/types/order';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
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
	customer_name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
	contact_number: z.string({ required_error: 'Contact number is required' }).min(1, { message: 'Contact number is required' }),
	payment_status: z.string({ required_error: 'Payment Status is required'}).min(1, { message: 'Payment Status is required' }),
	estimated_delivery: z.string({ required_error: 'Estimated Delivery Date is required'}).min(1, { message: 'Estimated Delivery Date is required' }),
	amount_paid: z.string({ required_error: 'Amount Paid is required'}).min(1, { message: 'Amount Paid is required' })
	
});
	

export const actions = {
	edit: async ({ request, fetch, params }) => {
		console.log('editing order ---');
		const updatedOrder = Object.fromEntries(await request.formData());
		// Validate form data
		const result = orderSchema.safeParse({
			customer_name: updatedOrder.customer_name as string,
			contact_number: updatedOrder.primary_number as string,
		});
		if (!result.success) {
			console.log(result.error.flatten().fieldErrors);
			return fail(400, {
				data: {
					customer_name: updatedOrder.customer_name as string,
					contact_number: updatedOrder.primary_number as string,
					payment_status: updatedOrder.payment_status as string,
					estimated_delivery: updatedOrder.estimated_delivery as string,
					amount_paid: updatedOrder.amount_paid as string
				},
				errors: result.error.flatten().fieldErrors
			});
		}
		console.log(updatedOrder);
		const res = await fetch(`/api/orders/${params.id}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedOrder)
		});
		const data = await res.json();
		if (data.success) {
			console.log('edited order', res);
			throw redirect(303, '/admin/orders');
		}
		throw error(500, 'Order not edited');
	}
} satisfies Actions;
