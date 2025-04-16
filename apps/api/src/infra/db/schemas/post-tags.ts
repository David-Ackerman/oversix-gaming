import { pgTable, text } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7';
import { posts } from "./posts";

export const postTags = pgTable("post_tags", {
  id: text('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),
  postId: text("post_id").references(() => posts.id).notNull(),
  tag: text("tag").notNull(),
});