import type { Offering } from '$lib/types/offering';
import type { Product } from '$lib/types/product';

export interface Category {
	id: string;
	name: string;
	products: Product[]?;
	offerings: Offering[]?;
}
