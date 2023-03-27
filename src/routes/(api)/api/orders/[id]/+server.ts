import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOrder } from '$lib/server/orders/get';

// Get a category from the database
export const GET = (async ({ params }) => {
	try {
		const order = await getOrder(params.id ?? '');
		return json({
			success: true,
			order
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;