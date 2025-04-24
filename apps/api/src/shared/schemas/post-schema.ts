import { z } from "zod";
import { contentBlockSchema } from "./content-block-schema";

// Author (from users table)
const authorSchema = z.object({
	id: z.string(),
	name: z.string(),
	avatarUrl: z.string().nullable(),
});

// Top-level comment (from comments + likes)
const commentSchema = z.object({
	id: z.string(),
	content: z.string(),
	createdAt: z.date(),
	authorId: z.string(),
	postId: z.string(),
	parentCommentId: z.string().nullable(),
	author: authorSchema.nullable(), // because of left join
	likes: z.number(),
});

// Full post with comments and content
export const fullPostWithContentSchema = z.object({
	post: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		createdAt: z.date(),
	}),
	comment: commentSchema.nullable(), // from left join, may be null
	author: authorSchema.nullable(),
	likes: z.number(),
	content: z.array(contentBlockSchema),
});
