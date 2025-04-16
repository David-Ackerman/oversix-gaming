import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7';
import { users } from "./users";

export const posts = pgTable("posts", {
  id: text('id')
        .primaryKey()
        .$defaultFn(() => uuidv7()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  category: text("category").notNull(),
  authorId: text("author_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});