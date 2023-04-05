import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addProduct } from '$lib/server/products/add';
import { supabase } from '$lib/utils/supabase';

// Add a product to the database
export const POST = (async ({ request }) => {
	try {
		const product = await request.json();
		const { data, error } = await supabase.storage
			.from('images')
			.move(product.img_path, `products/${product.img_path}`);
		if (error) {
			throw error;
		}
		if (data) {
			console.log('File moved successfully.');
			product.img_path = `products/${product.img_path}`;
			const { data } = await supabase.storage.from('images').getPublicUrl(product.img_path);
			if (data) {
				product.img_src = data.publicUrl;
			}
		}
		await addProduct(product);
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
