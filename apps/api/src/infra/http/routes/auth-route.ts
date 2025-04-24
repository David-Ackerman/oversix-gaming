import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../../db";
import { users } from "../../db/schemas/users";

const oauthUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	avatarUrl: z.string().url().optional(),
	provider: z.enum(["google", "facebook", "apple"]),
	providerId: z.string(),
});

export const authRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/auth/oauth-login",
		{
			schema: {
				body: oauthUserSchema,
				response: {
					200: z.object({
						user: z.object({
							id: z.string(),
							name: z.string(),
							email: z.string().email(),
							avatarUrl: z.string().url().nullable(),
							provider: z.string(),
							providerId: z.string(),
							role: z.string(),
						}),
						token: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const body = oauthUserSchema.parse(request.body);

			const existingUser = await db.query.users.findFirst({
				where: (u, { eq, and }) =>
					and(eq(u.provider, body.provider), eq(u.providerId, body.providerId)),
			});

			if (existingUser) {
				return reply.send({
					user: existingUser,
					token: server.jwt.sign({ userId: existingUser.id }),
				});
			}

			await db.insert(users).values({
				name: body.name,
				email: body.email,
				avatarUrl: body.avatarUrl,
				provider: body.provider,
				providerId: body.providerId,
				role: "user",
			});

			const [newUser] = await db.query.users.findMany({
				where: (u, { eq }) => eq(u.email, body.email),
				limit: 1,
			});

			const token = server.jwt.sign({ userId: newUser.id });

			return reply.status(200).send({
				user: newUser,
				token,
			});
		},
	);
};
