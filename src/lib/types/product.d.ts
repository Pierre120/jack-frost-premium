import { Category } from "$lib/types/category";

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


