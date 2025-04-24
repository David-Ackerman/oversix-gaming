import { db } from "@/infra/db";
import { comments } from "@/infra/db/schemas/comments";
import { commentLikes } from "@/infra/db/schemas/comments-likes";
import { users } from "@/infra/db/schemas/users";
import { buildCommentTree } from "@/shared/build-comment-tree";
import { commentResponseSchema } from "@/shared/schemas/comment-response-schema";
import { eq, sql } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getPostCommentsRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/posts/:postId/comments",
		{
			schema: {
				params: z.object({
					postId: z.string(),
				}),
				querystring: z.object({
					page: z.coerce.number().default(1),
					limit: z.coerce.number().default(10),
				}),
				response: {
					200: z.array(commentResponseSchema), // You can create a proper Zod schema if needed
				},
			},
		},
		async (request, reply) => {
			const { postId } = request.params;
			const { page, limit } = request.query;

			const offset = (page - 1) * limit;

			const flatComments = await db
				.select({
					id: comments.id,
					content: comments.content,
					postId: comments.postId,
					authorId: comments.authorId,
					parentCommentId: comments.parentCommentId,
					createdAt: comments.createdAt,
					author: {
						id: users.id,
						name: users.name,
						avatarUrl: users.avatarUrl,
					},
					likes: sql<number>`COUNT(${commentLikes.id})`.as("likes"),
				})
				.from(comments)
				.leftJoin(users, eq(comments.authorId, users.id))
				.leftJoin(commentLikes, eq(comments.id, commentLikes.commentId))
				.where(eq(comments.postId, postId))
				.groupBy(comments.id, users.id, users.name, users.avatarUrl)
				.orderBy(comments.createdAt)
				.limit(limit)
				.offset(offset);

			const safeReplies = flatComments.map((comment) => {
				if (!comment.author) {
					throw new Error(`Comment ${comment.id} has no author`);
				}
				return {
					...comment,
					author: comment.author,
				};
			});
			return reply.status(200).send(safeReplies);
		},
	);
};
