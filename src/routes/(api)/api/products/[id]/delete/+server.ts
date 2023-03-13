import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteProduct } from '$lib/server/products/delete';

// Delete a product from the database
export const POST = (async ({ params }) => {
  try {
    const product = await deleteProduct(params.id ?? '');
    return json({ success: true, product });
  } catch (err) {
    console.error(err);
    return json({ success: false });
  }
}) satisfies RequestHandler;
