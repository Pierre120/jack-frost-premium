import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteProduct } from '$lib/server/products/delete';
import { supabase } from '$lib/utils/supabase';

// Delete a product from the database
export const POST = (async ({ params, fetch }) => {
  try {
    const prodRes = await fetch(`/api/products/${params.id}`);
    let product = await prodRes.json();
    console.log('In delete product', product);

    const { data, error } = await supabase.storage.from('images').remove([product.product.img_path]);

			if (error) {
				throw error;
			}
			if (data) {
				console.log('File deleted successfully.');
			}

     product = await deleteProduct(params.id ?? '');
    return json({ success: true, product });
  } catch (err) {
    console.error(err);
    return json({ success: false });
  }
}) satisfies RequestHandler;
