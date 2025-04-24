import { type Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "blog";

let client: MongoClient;
let db: Db;

export const getMongoDb = async (): Promise<Db> => {
	if (!client) {
		client = new MongoClient(uri);
		await client.connect();
		db = client.db(dbName);
	}
	return db;
};
