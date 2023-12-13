import { type Product } from '../../../types/index';
import type { ProductsDb } from '../models';

export default function makeAddProduct({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function addProduct({ productData }: { productData: Product }) {
    const newProduct = {
      ...productData,
    };

    await productsDb.insert({ product: newProduct });

    return newProduct;
  };
}
