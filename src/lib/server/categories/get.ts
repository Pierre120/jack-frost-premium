import { prisma } from '$lib/server/prisma';

// For getting a category, we need to pass in the category id
const getCategory = async (category_id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id: category_id
    },
    include: {
      offerings: true
    }
  });

  // for debugging purposes
  console.log(JSON.stringify(result));

  return result;
}

// For getting all categories, we don't need to pass in anything
const getAllCategories = async () => {
  const result = await prisma.category.findMany();

  // for debugging purposes
  console.log(JSON.stringify(result));

  return result;
}

export { getCategory, getAllCategories };
