
export interface Product {
	id: string;
	name: string;
	is_seasonal: boolean;
	category_id: string;
	img_path: string;
	img_src: string;
	description: string;
	category?: {id: string; name: string;}; // TODO: update data type to Category
	orders?: OrderDetails[];
}


