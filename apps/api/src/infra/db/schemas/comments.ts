import { pgTable,  text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7';
import { users } from "./users";
import { posts } from "./posts";

export const comments = pgTable("comments", {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  content: text("content").notNull(),
  postId: text("post_id").references(() => posts.id).notNull(),
  authorId: text("author_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});