import {
  InvalidPropertyError,
  RequiredParameterError,
  UniqueConstraintError,
} from '../../../libs/errors';
import makeHttpError from '../../../libs/http-error';
import type { Cart } from '../../../types';
import type { HttpRequest } from '../../../types/http-request';
import makeCart from '../dtos';
import type {
  AddCart,
  ListCart,
  ListCarts,
  RemoveCart,
  UpdateCart,
} from '../use-cases';

export function makePostCart({ add }: { add: AddCart }) {
  return async function postCart(httpRequest: HttpRequest<Cart>) {
    let cartData = httpRequest.body;

    if (!cartData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        cartData = JSON.parse(cartData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      const newCart = makeCart(cartData as Cart);
      const result = await add(newCart);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: (error as Error).message,
      });
    }
  };
}

export function makePutCart({
  update,
  findById,
}: {
  update: UpdateCart;
  findById: ListCart;
}) {
  return async function putCart(httpRequest: HttpRequest<Cart>) {
    let cartData = httpRequest.body;
    const { cid, pid } = httpRequest.pathParams || {};

    if (!cartData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }
    if (!cid || !pid) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No Product id or cart id provided.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        cartData = JSON.parse(cartData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      const existingCart = await findById({ cartId: cid });

      if (!existingCart) {
        return makeHttpError({
          statusCode: 404,
          errorMessage: 'Cart not found.',
        });
      }
      const newProduct = (cartData as Cart).products[0];

      if (!newProduct) {
        return makeHttpError({
          statusCode: 404,
          errorMessage: 'Invalid product.',
        });
      }

      const productAlreadyInCartIdx = existingCart.products.findIndex(
        product => product.productId === newProduct.productId
      );
      let newCart: Cart;

      if (productAlreadyInCartIdx >= 0) {
        existingCart!.products![productAlreadyInCartIdx]!.quantity +=
          newProduct.quantity;

        newCart = makeCart({
          ...existingCart,
        });
      } else {
        newCart = makeCart({
          ...existingCart,
          products: [
            ...existingCart.products,
            {
              productId: newProduct.productId,
              quantity: newProduct.quantity,
            },
          ],
        });
      }

      const result = await update({
        cartId: cid,
        productId: pid,
        changes: newCart,
      });

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: JSON.stringify({
          success: true,
          message: 'Product updated successfully!',
          data: result?.acknowledged ? newCart : null,
        }),
      };
    } catch (error) {
      return makeHttpError({
        errorMessage: (error as Error).message,
        statusCode:
          error instanceof UniqueConstraintError
            ? 409
            : error instanceof InvalidPropertyError ||
              error instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  };
}

export function makeGetCarts({ findAll }: { findAll: ListCarts }) {
  return async function getCarts(httpRequest: HttpRequest<Cart>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const result = await findAll();

      return {
        headers,
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return {
        headers,
        statusCode: 400,
        data: JSON.stringify({
          success: false,
          message: (error as Error).message,
        }),
      };
    }
  };
}

export function makeGetCart({ findById }: { findById: ListCart }) {
  return async function getCart(httpRequest: HttpRequest<Cart>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { cid } = httpRequest.pathParams || {};

      if (!cid) {
        return {
          headers,
          statusCode: 400,
          data: JSON.stringify({
            success: false,
            message: 'Bad request. No cartId provided.',
          }),
        };
      }

      const result = await findById({ cartId: cid });

      return {
        headers,
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return {
        headers,
        statusCode: 400,
        data: JSON.stringify({
          success: false,
          message: (error as Error).message,
        }),
      };
    }
  };
}

export function makeDeleteCart({ remove }: { remove: RemoveCart }) {
  return async function deleteCart(httpRequest: HttpRequest<Cart>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { cid } = httpRequest.pathParams || {};

      if (!cid) {
        return {
          headers,
          statusCode: 400,
          data: JSON.stringify({
            success: false,
            message: 'Bad request. No cartId provided.',
          }),
        };
      }

      await remove({ cartId: cid });

      return {
        headers,
        statusCode: 204,
        data: JSON.stringify({ success: true, message: 'Cart deleted.' }),
      };
    } catch (error) {}
  };
}
