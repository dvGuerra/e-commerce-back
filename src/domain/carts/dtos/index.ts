import { cartSchema } from '../../../schemas/carts';
import type { Cart } from '../../../types';
import buildMakeCart from './carts';

const makeCart = buildMakeCart({ validate });

export default makeCart;

function validate(cart: Cart) {
  const validatedCart = cartSchema.safeParse(cart);

  if (!validatedCart.success) {
    throw new Error(validatedCart.error.message);
  }

  return validatedCart.data;
}
