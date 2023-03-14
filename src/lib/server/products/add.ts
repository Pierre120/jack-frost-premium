import { prisma } from '$lib/server/prisma';
import type { Product } from '$lib/types/product';

// For adding a product, we need to pass in the product
const addProduct = async (product: Product) => {
  const result = await prisma.product.create({
    data: {
      name: product.name,
      // is_seasonal: product.is_seasonal,
      // category_id: product.category_id,
      img_path: product.img_path,
      img_src: product.img_src,
      description: product.description,
      category: {
        connect: {
          id: product.category_id
        }
      }
    },
    // For debugging purposes, we can include the offerings in the result
    include: {
      category: true
    }
  });

  // for debugging purposes
  console.log(JSON.stringify(result));

  return result;
};

export { addProduct };
