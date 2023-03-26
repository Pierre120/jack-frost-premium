import { prisma } from '$lib/server/prisma';
import type { Order } from '$lib/types/order';

const editOrder = async (order_id: string, updatedOrder: Order) => {
	const result = await prisma.order.update({
		where: {
			id: order_id
		},
		data: {
			estimated_delivery: updatedOrder.estimated_delivery,
			payment_status: updatedOrder.payment_status
		},
		// For debugging purposes, we can include the offerings in the result
		include: {
			payments: true,
			order_details: true
		}
	});
	// for debugging purposes
	console.log(JSON.stringify(result));

	return result;
};

export { editOrder };
