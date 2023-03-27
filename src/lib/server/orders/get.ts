import { prisma } from '$lib/server/prisma';

const getOrder = async (order_id: string) => {
	const result = await prisma.order.findUnique({
		where: {
			id: order_id
		},
});
	console.log('ORDER ID:', order_id);
	// for debugging purposes
	console.log('ACQUIRED ORDER: ', JSON.stringify(result));

	return result;
};

// Get order number
const getOrderNumber = async (order_id: string) => {
	const result = await prisma.order.findUnique({
		where: {
			id: order_id
		},
		select: {
			number: true
		}
	});

	// for debugging purposes
	console.log('ACQUIRED ORDER NUMBER: ', JSON.stringify(result));

	return result;
};

const getAllOrders = async () => {
	const result = await prisma.order.findMany();

	// for debugging purposes
	console.log('ALL ORDERS: ', JSON.stringify(result));

	return result;
};

export { getOrder, getAllOrders, getOrderNumber };
