import type { WithId } from 'mongodb';
import { db } from '../../../db';
import type { Cart } from '../../../types';
import makeCartsDb from './carts-db.model';

const cartsCollection = db.collection<Cart>('Carts');

export type CartDbWithId = WithId<typeof cartsCollection>;
export type CartsCollection = typeof cartsCollection;

const cartsDb = makeCartsDb({ db: cartsCollection });
export type CartsDb = typeof cartsDb;

export default cartsDb;
