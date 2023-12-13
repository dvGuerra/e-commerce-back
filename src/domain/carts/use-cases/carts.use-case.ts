import type { Cart } from '../../../types';
import type { CartsDb } from '../models';

export function makeListCarts({ cartsDb }: { cartsDb: CartsDb }) {
  return async function listCarts() {
    return await cartsDb.findAll();
  };
}

export function makeListCart({ cartsDb }: { cartsDb: CartsDb }) {
  return async function listCart({ cartId }: { cartId: string }) {
    return await cartsDb.findById({ cartId });
  };
}

export function makeAddCart({ cartsDb }: { cartsDb: CartsDb }) {
  return async function addCart(cart: Cart) {
    return await cartsDb.insert({ cart });
  };
}

export function makeAddToCart({ cartsDb }: { cartsDb: CartsDb }) {
  return async function addToCart({
    cartId,
    productId,
    changes,
  }: {
    cartId: string;
    productId: string;
    changes: Cart;
  }) {
    return await cartsDb.update({ cartId, changes });
  };
}

export function makeDeleteCart({ cartsDb }: { cartsDb: CartsDb }) {
  return async function deleteCart({ cartId }: { cartId: string }) {
    return await cartsDb.remove({ cartId });
  };
}
