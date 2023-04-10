import { z } from 'zod';

export const productSchema = z.object({
	name: z
		.string({ required_error: 'Product name is required' })
		.min(1, { message: 'Product name is required' })
		.max(32, { message: 'Product name must be less than 32 characters' }),
	description: z
		.string({ required_error: 'Product description is required' })
		.min(1, { message: 'Product description is required' })
		.max(256, { message: 'Product description must be less than 256 characters' }),
	img_path: z
		.string({ required_error: 'Product image is required' })
		.min(1, { message: 'Product image is required' }),
	category_id: z
		.string({ required_error: 'Product category is required' })
		.min(1, { message: 'Product category is required' })
});
