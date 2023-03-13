import { Category } from '$lib/types/category';
import { OrderDetails } from '$lib/types/order';

export interface Product {
	id: string;
	name: string;
	is_seasonal: boolean;
	category_id: string;
	img_path: string;
	img_src: string;
	description: string;
	category?: Category;
	orders?: OrderDetails[];
}

export interface ProductUpdate {
	name: string;
	is_seasonal: boolean;
	category_id: string;
	img_path: string;
	img_src: string;
	description: string;
}
