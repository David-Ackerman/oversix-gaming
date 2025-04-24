import { db } from "@/infra/db";
import { postMetrics } from "@/infra/db/schemas/post-metrics";
import { postTags } from "@/infra/db/schemas/post-tags";
import { posts } from "@/infra/db/schemas/posts";
import { and, asc, desc, ilike, sql } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const postListSchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
	summary: z.string().nullable(),
	coverImage: z.string().nullable(),
	category: z.string(),
	createdAt: z.date(),
	metrics: z
		.object({
			views: z.number(),
			clicks: z.number(),
		})
		.nullable(),
});

export const listPostsRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/posts",
		{
			schema: {
				querystring: z.object({
					title: z.string().optional(),
					tag: z.string().optional(),
					order: z.enum(["asc", "desc"]).optional().default("desc"),
					limit: z.coerce.number().min(1).max(100).default(10),
					offset: z.coerce.number().min(0).default(0),
				}),
				response: {
					200: z.array(postListSchema),
				},
			},
		},
		async (request, reply) => {
			const { title, tag, order, limit, offset } = request.query;

			const conditions = [];

			if (title) {
				conditions.push(ilike(posts.title, `%${title}%`));
			}

			if (tag) {
				conditions.push(sql`${posts.id} IN (
          SELECT ${postTags.postId}
          FROM ${postTags}
          WHERE ${postTags.tag} = ${tag}
        )`);
			}

			const data = await db
				.select({
					id: posts.id,
					title: posts.title,
					slug: posts.slug,
					summary: posts.summary,
					coverImage: posts.coverImage,
					category: posts.category,
					createdAt: posts.createdAt,
					metrics: sql`
            (
              SELECT json_build_object(
                'views', COALESCE(SUM(${postMetrics.views}), 0),
                'clicks', COALESCE(SUM(${postMetrics.clicks}), 0)
              )
              FROM ${postMetrics}
              WHERE ${postMetrics.postId} = ${posts.id}
            )
          `.as("metrics"),
				})
				.from(posts)
				.where(conditions.length > 0 ? and(...conditions) : undefined)
				.orderBy(order === "asc" ? asc(posts.createdAt) : desc(posts.createdAt))
				.limit(limit)
				.offset(offset);

			return reply.status(200).send(z.array(postListSchema).parse(data));
		},
	);
};
