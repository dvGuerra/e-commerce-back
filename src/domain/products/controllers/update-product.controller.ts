import {
  InvalidPropertyError,
  RequiredParameterError,
  UniqueConstraintError,
} from '../../../libs/errors';
import makeHttpError from '../../../libs/http-error';
import type { Product } from '../../../types';
import type { HttpRequest } from '../../../types/http-request';
import makeProduct from '../dtos';
import type { ListProduct, UpdateProduct } from '../use-cases';

export default function makeUpdateProduct({
  update,
  findById,
}: {
  update: UpdateProduct;
  findById: ListProduct;
}) {
  return async function updateProduct(httpRequest: HttpRequest<Product>) {
    const headers = {
      'Content-Type': 'application/json',
    };
    let productData = httpRequest.body;
    const { pid } = httpRequest.pathParams || {};

    if (!productData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No PATCH body.',
      });
    }
    if (!pid) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No product id provided.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        productData = JSON.parse(productData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. PUT body must be valid JSON.',
        });
      }
    }

    try {
      const existingProduct = await findById({ productId: pid });

      if (!existingProduct) {
        return makeHttpError({
          statusCode: 404,
          errorMessage: 'Product not found.',
        });
      }

      const newProduct = makeProduct({
        ...existingProduct,
        ...(productData as Product),
      });

      const result = await update({
        productId: pid,
        changes: newProduct,
      });

      return {
        headers,
        statusCode: 200,
        data: JSON.stringify(result),
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
