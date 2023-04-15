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
	const result = await prisma.product.findMany({
		orderBy: {
			name: 'asc'
		}
	});

	// for debugging purposes
	console.log(JSON.stringify(result));

	return result;
};

// For getting all similar products, we need to pass in the product name
const getSimilarProducts = async (product_name: string, product_id: string | undefined = undefined) => {
	let result;

	if(product_id === undefined) {
		result = await prisma.product.findMany({
			select: {
				name: true,
			},
			where: {
				name: {
					endsWith: product_name,
					mode: 'insensitive'
				}
			}
		});
	}
	else {
		result = await prisma.product.findMany({
			select: {
				name: true,
			},
			where: {
				name: {
					endsWith: product_name,
					mode: 'insensitive'
				},
				NOT: {
					id: product_id
				}
			}
		});
	}

	// for debugging purposes
	// console.log(JSON.stringify(result));

	return result;
};

export { getProduct, getAllProducts, getSimilarProducts };
