import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { editProduct } from '$lib/server/products/edit';

// Edit a product in the database
export const POST = (async ({ params, request }) => {
  try {
    const { name, is_seasonal, category_id, img_path, img_src, description } = await request.json();
    const product = await editProduct(params.id ?? '', {
      name,
      is_seasonal,
      category_id,
      img_path,
      img_src,
      description
    });
    return json({
      success: true,
      product
    });
  } catch (err) {
    console.error(err);
    return json({ success: false });
  }
}) satisfies RequestHandler;
