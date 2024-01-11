import { MongoClient } from "mongodb";
import typedEnv from "@/config";
// Connection URL
const url = typedEnv.MONGO_URL;
const databaseName = "mailer";
async function main(collectionName: string) {
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(databaseName);

  const collection = db.collection(collectionName);

  return collection;
}

export default main;
