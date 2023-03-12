import { prisma } from '$lib/server/prisma';

// For deleting a product, we need to pass in the product id
const deleteProduct = async (product_id: string) => {
  const result = await prisma.product.delete({
    where: {
      id: product_id
    }
  });

  // for debugging purposes
  console.log(JSON.stringify(result));

  return result;
};

export { deleteProduct };
