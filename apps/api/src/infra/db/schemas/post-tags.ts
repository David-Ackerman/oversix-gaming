import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

import { posts } from "./posts";

export const postTags = pgTable("post_tags", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  tag: text("tag").notNull(),
});