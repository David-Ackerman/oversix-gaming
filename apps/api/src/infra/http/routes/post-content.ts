import { db } from "@/infra/db";
import { getMongoDb } from "@/infra/db/mongo";
import { comments } from "@/infra/db/schemas/comments";
import { commentLikes } from "@/infra/db/schemas/comments-likes";
import { posts } from "@/infra/db/schemas/posts";
import { users } from "@/infra/db/schemas/users";
import { contentBlockSchema } from "@/shared/schemas/content-block-schema";
import { fullPostWithContentSchema } from "@/shared/schemas/post-schema";
import { and, count, eq, isNull } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { ObjectId, type WithId } from "mongodb";
import { uuidv7 } from "uuidv7";
import { z } from "zod";
import { authMiddleware } from "../middleware/authMiddleware";

const postContentSchema = z.object({
	blocks: z.array(contentBlockSchema),
	title: z.string(),
	summary: z.string().optional(),
	slug: z.string(),
	contentId: z.string(),
	coverImage: z.string().url().optional(),
	category: z.string(),
});

export const postContentRoute: FastifyPluginAsyncZod = async (server) => {
	// POST /api/post-content
	server.post(
		"/post-content",
		{
			preHandler: authMiddleware,
			schema: {
				body: postContentSchema,
				response: {
					201: z.object({ id: z.string() }),
					403: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.userId;

			const user = await db.query.users.findFirst({
				where: (u, { eq }) => eq(u.id, userId),
			});

			if (!user || (user.role !== "admin" && user.role !== "curator")) {
				return reply
					.status(403)
					.send({ message: "Forbidden: insufficient permissions" });
			}

			const content = postContentSchema.parse(request.body);

			try {
				const mongoDb = await getMongoDb();
				const result = await mongoDb
					.collection("postContents")
					.insertOne(content);

				const id = uuidv7();

				try {
					await db.insert(posts).values({
						id,
						title: content.title,
						summary: content.summary,
						slug: content.slug,
						contentId: result.insertedId.toString(),
						coverImage: content.coverImage,
						category: content.category,
						authorId: userId,
					});

					return reply.status(201).send({ id });
				} catch (pgErr) {
					// Manual rollback of Mongo if PostgreSQL insert fails
					await mongoDb
						.collection("postContents")
						.deleteOne({ _id: result.insertedId });

					console.error(
						"post publish error, content rollback performed:",
						pgErr,
					);
					return reply
						.status(500)
						.send({ message: "Failed to save post metadata." });
				}
			} catch (err) {
				console.error("Error creating post:", err);
				return reply.status(500).send({ message: "Internal server error" });
			}
		},
	);

	// GET /api/post-content/:id
	server.get(
		"/post-content/:id",
		{
			schema: {
				params: z.object({ id: z.string() }),
				response: {
					200: fullPostWithContentSchema,
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const mongoDb = await getMongoDb();
			const { id } = request.params;

			let doc: WithId<Document> | null;
			const data = await db
				.select({
					post: posts,
					comment: comments,
					author: {
						id: users.id,
						name: users.name,
						avatarUrl: users.avatarUrl,
					},
					likes: count(commentLikes.commentId).as("likes"),
				})
				.from(posts)
				.leftJoin(comments, eq(comments.postId, posts.id))
				.leftJoin(users, eq(comments.authorId, users.id))
				.leftJoin(commentLikes, eq(commentLikes.commentId, comments.id))
				.where(and(eq(posts.id, id), isNull(comments.parentCommentId)))
				.groupBy(comments.id, users.id, posts.id);
			try {
				doc = await mongoDb
					.collection("postContents")
					.findOne({ _id: new ObjectId(id) });
			} catch (err) {
				return reply.status(404).send({ message: "Invalid content ID." });
			}

			if (!doc) {
				return reply.status(404).send({ message: "Content not found." });
			}

			const { _id, ...content } = doc;

			const post = {
				...data[0],
				content,
			};

			try {
				const validated = fullPostWithContentSchema.parse(post);
				return reply.status(200).send(validated);
			} catch (err) {
				return reply
					.status(500)
					.send({ message: "Invalid content format in DB." });
			}
		},
	);
};
