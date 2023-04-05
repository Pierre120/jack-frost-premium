import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Order } from '$lib/types/order';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		throw redirect(303, '/'); // Redirect landing page
	}

	const res = await fetch('/api/orders'); //('/api/categories');
	const orders = await res.json();
	console.log(orders);

	if (orders.success) {
		return {
			orders: orders.orders as Order[]
		};
	}
	throw error(404, 'Orders not found');
}) satisfies PageServerLoad;
