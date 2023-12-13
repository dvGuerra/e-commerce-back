import {
  addCart,
  deleteCart,
  listCart,
  listCarts,
  updateCart,
} from '../use-cases';
import {
  makeDeleteCart,
  makeGetCart,
  makeGetCarts,
  makePostCart,
  makePutCart,
} from './carts-services';

const getCarts = makeGetCarts({ findAll: listCarts });
const getCart = makeGetCart({ findById: listCart });
const removeCart = makeDeleteCart({ remove: deleteCart });
const putCart = makePutCart({ update: updateCart, findById: listCart });
const postCart = makePostCart({ add: addCart });

const cartController = Object.freeze({
  getCarts,
  getCart,
  removeCart,
  putCart,
  postCart,
});

export default cartController;
export { getCart, getCarts, postCart, putCart, removeCart };
