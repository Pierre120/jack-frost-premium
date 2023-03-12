import { prisma } from '$lib/server/prisma';
import type { Offering } from '$lib/types/offering';

// For adding a category, we need to pass in the category name and an array of offerings
const addCategory = async (category: string, offerings: Offering[]) => {
	const result = await prisma.category.create({
		data: {
			name: category,
			offerings: {
				create: offerings
			}
		},
		// For debugging purposes, we can include the offerings in the result
		include: {
			offerings: true
		}
	});

	// for debugging purposes
	console.log(JSON.stringify(result));

	return result;
};

export default addCategory;
