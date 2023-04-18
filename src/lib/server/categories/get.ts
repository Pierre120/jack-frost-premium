import { prisma } from '$lib/server/prisma';

// For getting a category, we need to pass in the category id
const getCategory = async (category_id: string) => {
	const result = await prisma.category.findUnique({
		where: {
			id: category_id
		},
		include: {
			// offerings: true
			offerings: {
				orderBy: {
					size_name: 'desc'
				}
			}
		}
	});

	// for debugging purposes
	console.log('category from server: ', result);

	return result;
};

// For getting all categories, we don't need to pass in anything
const getAllCategories = async () => {
	const result = await prisma.category.findMany({
		orderBy: {
			name: 'asc'
		}
	});

	// for debugging purposes
	console.log('categories from server: ', result);

	return result;
};

// For getting all similar products, we need to pass in the product name
const getSimilarCategories = async (category_name: string, category_id: string | undefined = undefined) => {
	let result;

	if(category_id === undefined) {
		result = await prisma.category.findMany({
			select: {
				name: true,
			},
			where: {
				name: {
					endsWith: category_name,
					mode: 'insensitive'
				}
			}
		});
	}
	else {
		result = await prisma.category.findMany({
			select: {
				name: true,
			},
			where: {
				name: {
					endsWith: category_name,
					mode: 'insensitive'
				},
				NOT: {
					id: category_id
				}
			}
		});
	}

	// for debugging purposes
	// console.log(JSON.stringify(result));

	return result;
};


export { getCategory, getAllCategories, getSimilarCategories };
