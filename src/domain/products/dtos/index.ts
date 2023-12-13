import { productSchema } from '../../../schemas/product';
import type { Product } from '../../../types';
import makeBuildProduct from './products';

const makeProduct = makeBuildProduct({ validate });

export default makeProduct;

function validate(product: Product) {
  const validatedProduct = productSchema.safeParse(product);

  if (!validatedProduct.success) {
    throw new Error(validatedProduct.error.message);
  }

  return validatedProduct.data;
}
