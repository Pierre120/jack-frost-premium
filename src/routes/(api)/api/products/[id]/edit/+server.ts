import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { editProduct } from '$lib/server/products/edit';
import { supabase } from '$lib/utils/supabase';
import { getProduct } from '$lib/server/products/get';

// Edit a product in the database
export const POST = (async ({ params, request }) => {
	try {
		const { name, is_seasonal, category_id, img_path, img_src, description } = await request.json();
		let path = img_path;

		if (img_path.split('/')[0] !== 'products') {
			const product = await getProduct(params.id ?? '');

			const { data: data1, error: error1 } = await supabase.storage
				.from('images')
				.remove([product.img_path]);
			if (error1) {
				throw error1;
			}
			if (data1) {
				console.log('File moved successfully.');
				path = `products/${img_path}`;
			}

			const { data: data2, error: error2 } = await supabase.storage
				.from('images')
				.move(img_path, `products/${img_path}`);
			if (error2) {
				throw error2;
			}
			if (data2) {
				console.log('File moved successfully.');
				path = `products/${img_path}`;
			}
		}

		const product = await editProduct(params.id ?? '', {
			name,
			is_seasonal,
			category_id,
			img_path: path,
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
