import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params, fetch }) => {
  const session = await locals.validate();
  if (!session) {
    // throw error(401, 'Unauthorized user.'); // 401 error page
    throw redirect(303, '/'); // Redirect landing page
  }

  const prodRes = await fetch(`/api/products/${params.id}`);
  const categRes = await fetch(`/api/categories/`);
  const product = await prodRes.json();
  const categories = await categRes.json();
  if(product.success && categories.success) {
    return {
      product: product.product,
      categories: categories.categories
    };
  }
  throw error(404, 'Product not found');
}) satisfies PageServerLoad;