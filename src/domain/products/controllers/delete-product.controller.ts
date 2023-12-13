import type { ProductDb } from '../../../types';
import { type HttpRequest } from '../../../types/http-request';
import type { RemoveProduct } from '../use-cases';

export default function makeRemoveProduct({
  remove,
}: {
  remove: RemoveProduct;
}) {
  return async function removeProduct(httpRequest: HttpRequest<ProductDb>) {
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

      await remove({ productId: pid });

      return {
        headers,
        statusCode: 204,
        data: JSON.stringify({ success: true, message: 'Product deleted.' }),
      };
    } catch (error) {}
  };
}
