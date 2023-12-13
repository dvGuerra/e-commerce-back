import { type Product } from '../../../types/index';
import type { ProductsDb } from '../models';

export default function makeUpdateProduct({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function updateProduct({
    productId,
    changes,
  }: {
    productId: string;
    changes: Product;
  }) {
    return productsDb.update({ productId, changes });
  };
}
