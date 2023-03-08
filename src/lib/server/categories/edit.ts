import { prisma } from '$lib/server/prisma';
import type { Offering } from '$lib/types/offering';

// For editing a category, we need to pass in the category id
const editCategory = async (category_id: string, category_name: string, offerings: Offering[]) => {
	const result = await prisma.category.update({
		where: {
			id: category_id
		},
		data: {
			name: category_name,
			offerings: {
				upsert: offerings.map((offering) => ({
					where: {
						id: offering.id
					},
					create: offering,
					update: offering
				}))
			}
		}
	});

	// for debugging purposes
	console.log(JSON.stringify(result));
};

export { editCategory };
