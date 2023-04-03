import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { CartItem } from '$lib/types/cart';
import { z } from 'zod';

const orderSchema = z.object({
	customer_name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
	contact_number: z.string({ required_error: 'Contact number is required' }).min(1, { message: 'Contact number is required' }),
	payment_method: z.string({ required_error: 'Payment method is required' }).min(1, { message: 'Payment method is required' }),
});

export const actions = {
	order: async ({ request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
		const orderitems = JSON.parse(formData.orderitems);
		// Validate form data
		const result = orderSchema.safeParse({
			customer_name: formData.customer_name as string,
			contact_number: formData.contact_number as string,
			payment_method: formData.payment_method as string,
		});
		if (!result.success) {
			console.log(result.error.flatten().fieldErrors);
			return fail(400, {
				data: {
					customer_name: formData.customer_name as string,
					contact_number: formData.contact_number as string,
					payment_method: formData.payment_method as string,
					additional_details: formData.additional_details as string,
				},
				errors: result.error.flatten().fieldErrors
			});
		}
		// Add order
		const order = {
			name: formData.customer_name as string,
			contact: formData.contact_number as string,
			payment: formData.payment_method as string,
			total: Number(formData.totalprice),
			details: formData.additional_details as string,
			items: orderitems as CartItem[]
		};
		console.log('order: ', order);
		console.log('adding order ---');

		const res = await fetch('/api/orders/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(order)
		});
		const data = await res.json();
		console.log(data);
		if (data.success) {
			console.log('added order');
			throw redirect(303, `/order/checkout/${data.id}`);
		}
		throw fail(500, { message: 'Order not added' });
	}
} satisfies Actions;
