import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';
import type { RequestHandler } from '@sveltejs/kit';
import { getProducts } from '$lib/samples/products';

export const GET = (async () => {
  // TODO: Replace with actual database retrieval

  // Sample retrieval of products from database
  const products = await getProducts();
  
  return json(products);
}) satisfies RequestHandler;