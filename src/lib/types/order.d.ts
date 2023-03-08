import { Product } from "./product";

export interface Order {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  suffix?: string;
  primary_contact: string;
  secondary_contact?: string;
  delivery_address: string;
  estimated_delivery: Date;
  created_at: Date;
  updated_at: Date;
  payment_status: PaymentStatus;
  total_price: number;
  order_details?: OrderDetails[];
  payments: string[]; // to update
}

enum PaymentStatus {
  FP, // Full Payment
  DP, // Down Payment
  NP  // No Payment
}

export interface OrderDetails {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  order?: Order;
  product?: Product;
}