import { prisma } from '$lib/server/prisma';

const deleteOrder = async (order_id: string) => {
	const result = await prisma.order.delete({
		where: {
			id: order_id
		}
	});
	// for debugging purposes
	console.log(JSON.stringify(result));

	return result;
};

export { deleteOrder };
