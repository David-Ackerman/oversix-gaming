import {
	type AnyPgColumn,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";
import { posts } from "./posts";
import { users } from "./users";

export const comments = pgTable("comments", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),

	content: text("content").notNull(),

	postId: text("post_id")
		.references(() => posts.id)
		.notNull(),

	authorId: text("author_id")
		.references(() => users.id)
		.notNull(),

	parentCommentId: text("parent_comment_id").references(
		(): AnyPgColumn => comments.id,
	),

	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
