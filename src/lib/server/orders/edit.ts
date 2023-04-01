import { prisma } from '$lib/server/prisma';
import type { Order, OrderUpdate } from '$lib/types/order';

const editOrder = async (order_id: string, updatedOrder: OrderUpdate) => {
	const result = await prisma.order.update({
		where: {
			id: order_id
		},
		data: {
			name: updatedOrder.name,
			primary_contact: updatedOrder.primary_contact,
			estimated_delivery: new Date(updatedOrder.estimated_delivery),
			payment_status: updatedOrder.payment_status,
			amount_paid: updatedOrder.amount_paid
		},
		// For debugging purposes, we can include the offerings in the result
		include: {
			payments: true,
			order_details: true
		}
	});
	console.log("UPDATE ORDER PASSED:", JSON.stringify(updatedOrder));
	// for debugging purposes
	console.log('UPDATED ORDER:', JSON.stringify(result));

	return result;
};

export { editOrder };
