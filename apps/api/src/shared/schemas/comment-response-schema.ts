import { z } from "zod";

export const commentResponseSchema = z.object({
	id: z.string(),
	content: z.string(),
	createdAt: z.date(),
	authorId: z.string(),
	postId: z.string(),
	parentCommentId: z.string().nullable(),
	author: z.object({
		id: z.string(),
		name: z.string(),
		avatarUrl: z.string().nullable(),
	}),
	likes: z.number(),
});
