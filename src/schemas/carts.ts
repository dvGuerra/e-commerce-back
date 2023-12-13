import { z } from 'zod';

export const cartSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive().default(0),
    })
  ),
});
