import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  // fetch order number of a specific order from the database
  const res = await fetch(`/api/orders/${params.id}/number`);
  const { success, order_number } = await res.json();
  if (success) {
    return {
      order_number
    };
  }
  throw error(404, 'Order not found');
}) satisfies PageServerLoad;
