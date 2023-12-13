import type { Cart } from '../../../types';

export default function buildMakeCart({
  validate,
}: {
  validate: (cart: Cart) => Cart;
}) {
  return function makeAddCart(cart: Cart) {
    const validCart = validate(cart);

    return Object.freeze(validCart);
  };
}
