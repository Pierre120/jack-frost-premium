import { prisma } from '$lib/server/prisma';

// For getting a product, we need to pass in the product id
const getProduct = async (product_id: string) => {
	const result = await prisma.product.findUnique({
		where: {
			id: product_id
		},
		include: {
			category: true
		}
	});

	// for debugging purposes
	console.log(JSON.stringify(result));

	return result;
};

// For getting all products, we don't need to pass in anything
const getAllProducts = async () => {
	const result = await prisma.product.findMany();

	// for debugging purposes
	console.log(JSON.stringify(result));

	return result;
};

export { getProduct, getAllProducts };
