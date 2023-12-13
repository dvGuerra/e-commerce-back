import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(2, 'Title is too short'),
  description: z.string().min(5, 'Description is too short'),
  code: z.string(),
  price: z.number().positive(),
  status: z.boolean().default(true),
  stock: z.number().default(0),
  category: z.string(),
  images: z.array(z.string()),
  thumbnail: z.string().optional(),
  quantity: z.number().int().positive().default(0),
});
