import { boolean } from "drizzle-orm/gel-core";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";
import { users } from "./users";

export const posts = pgTable("posts", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	title: text("title").notNull(),
	summary: text("summary"),
	slug: text("slug").notNull().unique(),
	contentId: text("content_id").notNull(),
	coverImage: text("cover_image"),
	category: text("category").notNull(),
	authorId: text("author_id").references(() => users.id),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
