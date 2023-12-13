import cartsDb from '../models';
import {
  makeAddCart,
  makeAddToCart,
  makeDeleteCart,
  makeListCart,
  makeListCarts,
} from './carts.use-case';

const addCart = makeAddCart({ cartsDb });
const updateCart = makeAddToCart({ cartsDb });
const listCarts = makeListCarts({ cartsDb });
const listCart = makeListCart({ cartsDb });
const deleteCart = makeDeleteCart({ cartsDb });

const cartModel = Object.freeze({
  addCart,
  updateCart,
  listCarts,
  listCart,
  deleteCart,
});

export type AddCart = typeof addCart;
export type UpdateCart = typeof updateCart;
export type ListCarts = typeof listCarts;
export type ListCart = typeof listCart;
export type RemoveCart = typeof deleteCart;

export default cartModel;
export { addCart, deleteCart, listCart, listCarts, updateCart };
