import { prisma } from '$lib/server/prisma';

const getOrder = async (order_id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id: order_id
    },
    include: {
      order_details: {
        include: {
          offering: true,
          product: true
        }
      }
    }
  });
	console.log('ORDER ID:', order_id);
	// for debugging purposes
	console.log('ACQUIRED ORDER: ', JSON.stringify(result));
	console.log('ORDER DETAILS: ', JSON.stringify(result.order_details));

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
	const result = await prisma.order.findMany({
		include: {
      order_details: {
        include: {
          offering: true,
          product: true
        }
      }
    }
	});

	// for debugging purposes
	console.log('ALL ORDERS: ', JSON.stringify(result));

	return result;
};

export { getOrder, getAllOrders, getOrderNumber };
