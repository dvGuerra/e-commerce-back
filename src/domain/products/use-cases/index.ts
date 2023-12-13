import productsDb from '../models';
import makeAddProduct from './add-product';
import makeListProduct from './list-product';
import makeListProducts from './list-products';
import makeRemoveProduct from './remove-product';
import makeUpdateProduct from './update-product';

const listProducts = makeListProducts({ productsDb });
const addProduct = makeAddProduct({ productsDb });
const updateProduct = makeUpdateProduct({ productsDb });
const listProduct = makeListProduct({ productsDb });
const deleteProduct = makeRemoveProduct({ productsDb });

const productService = Object.freeze({
  listProducts,
  addProduct,
  updateProduct,
  listProduct,
  deleteProduct,
});

export type ListProducts = typeof listProducts;
export type ListProduct = typeof listProduct;
export type AddProduct = typeof addProduct;
export type UpdateProduct = typeof updateProduct;
export type RemoveProduct = typeof deleteProduct;

export default productService;
export { addProduct, deleteProduct, listProduct, listProducts, updateProduct };
