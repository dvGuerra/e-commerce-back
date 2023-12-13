import type { Product } from '../../../types';

export default function makeBuildProduct({
  validate,
}: {
  validate: (product: Product) => Product;
}) {
  return function makeProduct(product: Product) {
    const validProduct = validate(product);

    return Object.freeze(validProduct);
  };
}
