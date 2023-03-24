import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { CartItem } from '$lib/types/cart';

export const actions = {
	order: async ({ request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
		const orderitems = JSON.parse(formData.orderitems);
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
