import type { ProductsDb } from '../models';

export default function makeListProduct({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function listProduct({ productId }: { productId: string }) {
    return productsDb.findById({ productId });
  };
}
