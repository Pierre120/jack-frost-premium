import type { Order } from '$lib/types/order';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

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
	console.log("ORDERS GOING TO edit.svelte:", order);
	throw error(404, 'Order not found');
}) satisfies PageServerLoad;

export const actions = {
	edit: async ({ request, fetch, params }) => {
		console.log('editing order ---');
		const updatedOrder = Object.fromEntries(await request.formData());
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
