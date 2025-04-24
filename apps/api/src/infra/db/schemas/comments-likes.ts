import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";
import { comments } from "./comments";
import { users } from "./users";

export const commentLikes = pgTable("comment_likes", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),

	commentId: text("comment_id")
		.references(() => comments.id)
		.notNull(),

	userId: text("user_id")
		.references(() => users.id)
		.notNull(),

	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
