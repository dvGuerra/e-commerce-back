import { ObjectId } from 'mongodb';
import type { ProductsCollection } from '.';
import type { Product } from '../../../types';

export default function makeProductsDb({ db }: { db: ProductsCollection }) {
  return Object.freeze({
    insert,
    remove,
    findById,
    findAll,
    update,
  });

  async function findAll({ limit, sort }: { limit: number; sort?: string }) {
    let sortQuery = {};

    if (sort === 'asc') sortQuery = { price: 1 };
    else if (sort === 'desc') sortQuery = { price: -1 };

    return await db.find().limit(+limit).sort(sortQuery).toArray();
  }

  async function findById({ productId }: { productId: string }) {
    const result = await db.findOne({ _id: new ObjectId(productId) });

    if (!result) return null;

    return result;
  }

  async function insert({ product }: { product: Product }) {
    const result = await db.insertOne(product);

    return result;
  }

  async function remove({ productId }: { productId: string }) {
    const result = await db.findOneAndDelete({ _id: new ObjectId(productId) });

    if (!result) return null;

    return true;
  }

  async function update({
    productId,
    changes,
  }: {
    productId: string;
    changes: Product;
  }) {
    const result = await db.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: changes },
      { returnDocument: 'after' }
    );

    if (!result) return null;

    return result;
  }
}
