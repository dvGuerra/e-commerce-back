import type { Router } from 'express';
import express from 'express';

import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  removeProduct,
} from '../domain/products/controllers';
import makeExpressCallback from '../libs/express-callback';
import type { Product } from '../types';

const router: Router = express.Router();

router.get('/', makeExpressCallback<Product>(getProducts));
router.get('/:pid', makeExpressCallback<Product>(getProduct));
router.post('/', makeExpressCallback<Product>(postProduct));
router.delete('/:pid', makeExpressCallback<Product>(removeProduct));
router.put('/:pid', makeExpressCallback<Product>(putProduct));

export default router;
