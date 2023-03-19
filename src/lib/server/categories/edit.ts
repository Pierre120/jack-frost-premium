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
					create: {
						...offering
					},
					update: {
            ...offering,
            size_name: offering.size_name,
            price: offering.price
          }
				}))
			}
		},
		include:{
			offerings:{
				select: {
					id: true,
					size_name: true,
					price: true
				},
			}
		}
	});
	


	// for debugging purposes
	console.log("RESULT:" + JSON.stringify(result));
	console.log("OFFERINGS:" + JSON.stringify(result.offerings));


	//return result;
	return {
    id: result.id,
    name: result.name,
    offerings: result.offerings.map((offering) => ({
      id: offering.id,
      size_name: offering.size_name,
      price: offering.price
    }))
  };
};

export { editCategory };

