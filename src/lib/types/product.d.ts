import type { Offering } from '$lib/types/offering';

// export interface Offering {
// 	amount: string;
// 	other_amt: string;
// 	price: number;
// }

export interface Product {
	id: string;
	name: string;
	img_src: string;
	description: string;
	offerings: Offering[];
}
