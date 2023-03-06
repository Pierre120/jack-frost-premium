import { prisma } from '$lib/server/prisma';

// For deleting a category, we need to pass in the category id
const deleteCategory = async (category_id: string) => {
  const result = await prisma.category.delete({
    where: {
      id: category_id
    }
  });

  // for debugging purposes
  console.log(JSON.stringify(result));

  return result;
}

export { deleteCategory };