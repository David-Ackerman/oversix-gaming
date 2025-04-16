import { pgTable,  text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7';
import { posts } from "./posts";

export const postMetrics = pgTable("post_metrics", {
  id: text('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),
  postId: text("post_id").references(() => posts.id).notNull(),
  views: integer("views").default(0),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});