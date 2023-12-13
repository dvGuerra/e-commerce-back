import type { Router } from 'express';
import express from 'express';
import {
  getCart,
  getCarts,
  postCart,
  putCart,
  removeCart,
} from '../domain/carts/controllers';
import makeExpressCallback from '../libs/express-callback';
import type { Cart } from '../types';

const router: Router = express.Router();

router.get('/', makeExpressCallback<Cart>(getCarts));
router.get('/:cid', makeExpressCallback<Cart>(getCart));
router.post('/', makeExpressCallback<Cart>(postCart));
router.delete('/:cid', makeExpressCallback<Cart>(removeCart));
router.put('/:cid/product/:pid', makeExpressCallback<Cart>(putCart));

export default router;
