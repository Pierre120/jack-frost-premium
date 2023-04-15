import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addProduct } from '$lib/server/products/add';
import { getSimilarProducts } from '$lib/server/products/get';
import { supabase } from '$lib/utils/supabase';

// Add a product to the database
export const POST = (async ({ request }) => {
	try {
		const product = await request.json();

		// Check if product already exists
		const simProducts = await getSimilarProducts(product.name);
		console.log('Simlar products: ' + JSON.stringify(simProducts));
		if (simProducts.length > 0) return json({ success: false, error: 'Product already exists.' });

		// Move uploaded image to products folder
		console.log('moving uploaded image to products folder...');
		const { data, error } = await supabase.storage
			.from('images')
			.move(product.img_path, `products/${product.img_path}`);
		console.log(JSON.stringify(data));
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
		// Add product to database
		await addProduct(product);
		return json({ success: true });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
}) satisfies RequestHandler;
