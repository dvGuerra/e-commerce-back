import type { z } from 'zod';
import type { cartSchema } from '../schemas/carts';
import type { productSchema } from '../schemas/product';

export type Product = z.infer<typeof productSchema>;
export type ProductDb = Product & { id: string };
export type Cart = z.infer<typeof cartSchema>;
export type CartDb = Cart & { id: string };
export type ProductAggregateResult = Product & {
  productId: string;
  quantity: number;
};
export type CartAggregateResult = {
  id: string;
  products: ProductAggregateResult[];
};
export type SuccessResponse<T> = {
  status: true;
  payload: T;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevLink: string | null;
  nextLink: string | null;
};
