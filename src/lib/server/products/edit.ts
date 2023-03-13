import { prisma } from '$lib/server/prisma';
import type { ProductUpdate } from '$lib/types/product';

// For editing a product, we need to pass in the product id
const editProduct = async (product_id: string, updatedProduct: ProductUpdate ) => {
  const result = await prisma.product.update({
    where: {
      id: product_id
    },
    data: {
      name: updatedProduct.name,
      is_seasonal: updatedProduct.is_seasonal,
      category_id: updatedProduct.category_id,
      img_path: updatedProduct.img_path,
      img_src: updatedProduct.img_src,
      description: updatedProduct.description,
      category: {
        connect: {
          id: updatedProduct.category_id
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

export { editProduct };
