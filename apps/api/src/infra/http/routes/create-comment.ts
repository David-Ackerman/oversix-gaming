import { db } from "@/infra/db";
import { comments } from "@/infra/db/schemas/comments";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { uuidv7 } from "uuidv7";
import { z } from "zod";
import { authMiddleware } from "../middleware/authMiddleware";

export const createCommentRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/posts/:postId/comments",
		{
			preHandler: authMiddleware,
			schema: {
				params: z.object({
					postId: z.string(),
				}),
				body: z.object({
					content: z.string().min(1),
					parentCommentId: z.string().nullable().optional(),
				}),
				response: {
					201: z.object({ id: z.string(), message: z.string() }),
					400: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.userId;
			const { postId } = request.params;
			const { content, parentCommentId } = request.body;

			const post = await db.query.posts.findFirst({
				where: (post, { eq }) => eq(post.id, postId),
			});

			if (!post) {
				return reply.status(400).send({ message: "Post does not exist." });
			}

			const id = uuidv7();
			await db.insert(comments).values({
				id,
				content,
				postId,
				authorId: userId,
				parentCommentId: parentCommentId ?? null,
				createdAt: new Date(),
			});

			return reply.status(201).send({
				id,
				message: "Comment created successfully",
			});
		},
	);
};
