import { getMongoDb } from "@/infra/db/mongo";
import { ObjectId } from "mongodb";

type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string }
  | { type: "youtube"; videoId: string };

export type PostContent = {
  blocks: ContentBlock[];
};

export async function insertPostContent(content: PostContent) {
  const db = await getMongoDb();
  const result = await db.collection("postContents").insertOne(content);
  return result.insertedId.toString();
}

export async function getPostContent(id: string): Promise<PostContent | null> {
  const db = await getMongoDb();
  const doc = await db
    .collection("postContents")
    .findOne({ _id: new ObjectId(id) });

  if (!doc) return null;

  const { _id, ...content } = doc;
  return content as PostContent;
}
