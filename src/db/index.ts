import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DBNAME = process.env.MONGO_DBNAME;

const mongoUri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ublzqdv.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db();
