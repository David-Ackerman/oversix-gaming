import { db } from "@/infra/db";
import { comments } from "@/infra/db/schemas/comments";
import { commentLikes } from "@/infra/db/schemas/comments-likes";
import { users } from "@/infra/db/schemas/users";
import { commentResponseSchema } from "@/shared/schemas/comment-response-schema";
import { eq, sql } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getCommentRepliesRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/comments/:commentId/replies",
		{
			schema: {
				params: z.object({
					commentId: z.string(),
				}),
				response: {
					200: z.array(commentResponseSchema),
				},
			},
		},
		async (request, reply) => {
			const { commentId } = request.params;

			const replies = await db
				.select({
					id: comments.id,
					content: comments.content,
					createdAt: comments.createdAt,
					authorId: comments.authorId,
					postId: comments.postId,
					parentCommentId: comments.parentCommentId,
					author: {
						id: users.id,
						name: users.name,
						avatarUrl: users.avatarUrl,
					},
				})
				.from(comments)
				.leftJoin(users, eq(comments.authorId, users.id))
				.where(eq(comments.parentCommentId, commentId));

			const safeReplies = replies.map((comment) => {
				if (!comment.author) {
					throw new Error(`Comment ${comment.id} has no author`);
				}
				return {
					...comment,
					author: comment.author,
				};
			});
			const repliesWithLikes = await Promise.all(
				safeReplies.map(async (reply) => {
					const likesCount = await db
						.select({ count: sql<number>`count(*)` })
						.from(commentLikes)
						.where(eq(commentLikes.commentId, reply.id))
						.then((res) => Number(res[0]?.count ?? 0));

					return {
						...reply,
						likes: likesCount,
					};
				}),
			);

			return reply.send(repliesWithLikes);
		},
	);
};
