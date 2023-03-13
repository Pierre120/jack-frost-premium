import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addProduct } from '$lib/server/products/add';

// Add a product to the database
export const POST = (async ({ request }) => {
  try {
    const product = await request.json();
    await addProduct(product);
    return json({ success: true });
  } catch (err) {
    console.error(err);
    return json({ success: false });
  }
}) satisfies RequestHandler;
