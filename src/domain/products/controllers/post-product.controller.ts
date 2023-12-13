import {
  InvalidPropertyError,
  RequiredParameterError,
  UniqueConstraintError,
} from '../../../libs/errors';
import makeHttpError from '../../../libs/http-error';
import validateImage from '../../../libs/validate-image';
import type { Product } from '../../../types';
import type { HttpRequest } from '../../../types/http-request';
import makeProduct from '../dtos';
import type { AddProduct } from '../use-cases';

export default function makePostProduct({ add }: { add: AddProduct }) {
  return async function postProduct(httpRequest: HttpRequest<Product>) {
    const headers = {
      'Content-Type': 'application/json',
    };
    let productData = httpRequest.body;

    if (!productData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        productData = JSON.parse(productData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      if (!httpRequest.file) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. No image file.',
        });
      }
      console.log('[=>]', httpRequest.file);

      await validateImage(httpRequest.file.buffer);

      const newProduct = makeProduct(productData as Product);
      const result = await add({ productData: newProduct });

      return {
        headers,
        statusCode: 201,
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
