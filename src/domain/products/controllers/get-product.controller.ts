import type { ProductDb } from '../../../types';
import type { HttpRequest } from '../../../types/http-request';
import type { ListProduct } from '../use-cases';

export default function makeGetProduct({
  listProduct,
}: {
  listProduct: ListProduct;
}) {
  return async function getProduct(httpRequest: HttpRequest<ProductDb>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { pid } = httpRequest.pathParams || {};

      if (!pid) {
        return {
          headers,
          statusCode: 400,
          data: JSON.stringify({
            success: false,
            message: 'Bad request. No productId provided.',
          }),
        };
      }

      const result = await listProduct({ productId: pid });

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
