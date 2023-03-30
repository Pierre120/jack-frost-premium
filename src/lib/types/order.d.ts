import { Product } from '$lib/types/product';
import { Payment } from '$lib/types/payment';
import { Offering } from '$lib/types/offering';

export interface Order {
	id: string;
	number?: number;
	email?: string;
	name: string;
	first_name?: string;
	last_name?: string;
	suffix?: string;
	primary_contact: string;
	secondary_contact?: string;
	delivery_address?: string;
	estimated_delivery?: Date;
	created_at?: Date;
	updated_at?: Date;
	payment_status?: string | PaymentStatus;
	payment_mode: string | PaymentMode;
	total_price: number;
	amount_paid?: number;
	additional_details?: string;
	order_details?: OrderDetails[];
	payments?: Payment[]; // to update
}

enum PaymentStatus {
	SS, // Success Payment / Settled Payment
	FP, // Full Payment / Fully Paid
	PP, // Down Payment / Partially Paid
	NP // No Payment / Unpaid
}

enum PaymentMode {
	GCASH, // GCash
	MAYA, // Maya
	BDO // BDO
}

export interface OrderDetails {
	id: string;
	order_id: string;
	product_id: string;
	offering_id: string;
	quantity: number;
	order?: Order;
	product?: Product;
	offering?: Offering;
}

export interface OrderUpdate {
	estimated_delivery: Date;
	payment_status: string | PaymentStatus;
	amount_paid: number;
	//name: string;
	//primary_contact: string;
	//payment_mode: string | PaymentMode;
	//additional_details?: string;
}
