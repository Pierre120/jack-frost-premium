import { prisma } from '$lib/server/prisma';

// For getting a category, we need to pass in the category name
const getCategory = async (category: string) => {
  const result = await prisma.categories.findUnique({
    where: {
      name: category
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
const getCategories = async () => {
  const result = await prisma.categories.findMany();

  // for debugging purposes
  console.log(JSON.stringify(result));

  return result;
}

export { getCategory, getCategories };
