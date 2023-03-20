import type { Offering } from './offering';
import { Product } from './product';

export interface CartItem {
	product: Product;
	offering: Offering
	quantity: number;
}

export interface Cart {
	items: CartItem[];
	count: number;
	total: number;
}
