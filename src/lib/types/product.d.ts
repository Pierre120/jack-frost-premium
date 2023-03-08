import { OrderDetails } from "./order";

export interface Offering {
	amount: string;
	other_amt: string;
	price: number;
}

export interface Product {
	id: string;
	name: string;
	is_seasonal: boolean;
	category_id: string;
	img_src: string;
	description: string;
	category?: string; // TODO: update data type to Category
	orders?: OrderDetails[];
}


