import { relations } from "drizzle-orm";
import { comments } from "./comments";
import { commentLikes } from "./comments-likes";
import { users } from "./users";

export const commentsRelations = relations(comments, ({ one, many }) => ({
	author: one(users, {
		fields: [comments.authorId],
		references: [users.id],
	}),
	likes: many(commentLikes),

	replies: many(comments, {
		relationName: "replies", // ✅ only this
	}),
}));

// Likes → Comment + User
export const commentLikesRelations = relations(commentLikes, ({ one }) => ({
	comment: one(comments, {
		fields: [commentLikes.commentId],
		references: [comments.id],
	}),
	user: one(users, {
		fields: [commentLikes.userId],
		references: [users.id],
	}),
}));
