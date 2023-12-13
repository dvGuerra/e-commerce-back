import {
  addProduct,
  deleteProduct,
  listProduct,
  listProducts,
  updateProduct,
} from '../use-cases';
import makeRemoveProduct from './delete-product.controller';
import makeGetProduct from './get-product.controller';
import makeGetProducts from './get-products.controller';
import makePostProduct from './post-product.controller';
import makeUpdateProduct from './update-product.controller';

const getProducts = makeGetProducts({ listProducts });
const getProduct = makeGetProduct({ listProduct });
const removeProduct = makeRemoveProduct({ remove: deleteProduct });
const putProduct = makeUpdateProduct({
  update: updateProduct,
  findById: listProduct,
});
const postProduct = makePostProduct({ add: addProduct });

const productController = Object.freeze({
  getProducts,
  getProduct,
  removeProduct,
  putProduct,
  postProduct,
});

export default productController;
export { getProduct, getProducts, postProduct, putProduct, removeProduct };
