import { Order } from './order';

export interface Payment {
	id: string;
	order_id: string;
	amount: number;
	paid_at: Date;
	payment_mode: PaymentMode;
	order?: Order;
}

enum PaymentMode {
	GCASH,
	BPI
}
