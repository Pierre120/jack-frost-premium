import { prisma } from '$lib/server/prisma';
import type { CartItem } from '$lib/types/cart';

// For adding an order, we need to pass in the customer's name, contact number,
// payment method, total price, additional details and order items
const addOrder = async (
	name: string,
	contact: string,
	payment: string,
	total: number,
	details: string,
	items: CartItem[]
) => {
	// console.log('order items to add: ', JSON.stringify(items.map(item => ({
	//   product_id: item.product.id,
	//   offering_id: item.offering.id,
	//   quantity: item.quantity
	// }))));
	console.log(total);
	const result = await prisma.order.create({
		data: {
			name,
			primary_contact: contact,
			payment_mode: payment,
			total_price: total,
			additional_details: details,
			order_details: {
				create: items.map((item) => ({
					product_id: item.product.id,
					offering_id: item.offering.id,
					quantity: item.quantity
				}))
			}
		},
		// For debugging purposes, we can include the order details in the result
		include: {
			order_details: true
		}
	});

	// for debugging purposes
	console.log('added order: ', JSON.stringify(result));

	return result;
};

export default addOrder;
