import type { WithId } from 'mongodb';
import { db } from '../../../db';
import type { Product } from '../../../types';
import makeProductsDb from './products-db.model';

const productsCollection = db.collection<Product>('Products');

export type ProductDbWithId = WithId<typeof productsCollection>;
export type ProductsCollection = typeof productsCollection;

const productsDb = makeProductsDb({ db: productsCollection });
export type ProductsDb = typeof productsDb;

export default productsDb;
