import type { ProductsDb } from '../models';

export default function makeRemoveProduct({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function removeProduct({ productId }: { productId: string }) {
    return productsDb.remove({ productId });
  };
}
