import { ObjectId } from 'mongodb';
import type { CartsCollection } from '.';
import type { Cart, CartAggregateResult } from '../../../types';

export default function makeCartsDb({ db }: { db: CartsCollection }) {
  return Object.freeze({
    insert,
    remove,
    findById,
    findAll,
    update,
  });

  async function findAll() {
    return await db
      .aggregate([
        { $unwind: '$products' },
        {
          $lookup: {
            from: 'Products',
            localField: 'products.productId',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $addFields: {
            'products.productDetails': { $arrayElemAt: ['$productDetails', 0] },
          },
        },
        {
          $group: {
            _id: '$_id',
            products: { $push: '$products' },
          },
        },
      ])
      .toArray();
  }

  async function findById({ cartId }: { cartId: string }) {
    if (!cartId) return null;

    const cart = await db.findOne({ _id: new ObjectId(cartId) });

    if (!cart) return null;

    const result = await db
      .aggregate([
        {
          $match: { _id: cart._id },
        },
        {
          $lookup: {
            from: 'Products',
            let: {
              productIds: '$products.productId',
              quantities: '$products.quantity',
            },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$_id', '$$productIds'] },
                },
              },
              {
                $addFields: {
                  quantity: {
                    $arrayElemAt: [
                      '$$quantities',
                      { $indexOfArray: ['$$productIds', '$_id'] },
                    ],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  productId: '$_id',
                  title: 1,
                  description: 1,
                  code: 1,
                  price: 1,
                  status: 1,
                  stock: 1,
                  category: 1,
                  images: 1,
                  thumbnail: 1,
                  quantity: 1,
                },
              },
            ],
            as: 'products',
          },
        },
      ])
      .toArray();

    return result[0] as CartAggregateResult;
  }

  async function insert({ cart }: { cart: Cart }) {
    const result = await db.insertOne(cart);

    return result;
  }

  async function remove({ cartId }: { cartId: string }) {
    const result = await db.findOneAndDelete({ _id: new ObjectId(cartId) });

    if (!result) return null;

    return true;
  }

  async function update({
    cartId,
    changes,
  }: {
    cartId: string;
    changes: Cart;
  }) {
    const result = await db.updateOne(
      { _id: new ObjectId(cartId) },
      { $set: changes }
    );

    if (!result) return null;

    return result;
  }
}
