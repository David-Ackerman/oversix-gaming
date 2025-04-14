import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { posts } from "./posts";

export const postMetrics = pgTable("post_metrics", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  views: integer("views").default(0),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});