import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";

import { env } from "@/env";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { authRoute } from "./routes/auth-route";
import { createCommentRoute } from "./routes/create-comment";
import { getCommentRepliesRoute } from "./routes/get-comment-replies";
import { getPostCommentsRoute } from "./routes/get-post-comments";
import { postContentRoute } from "./routes/post-content";
import { listPostsRoute } from "./routes/posts-list";
import { transformSwaggerSchema } from "./transform-swagger-schema";

const server = Fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
	console.error(error);

	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	return reply.status(500).send({
		message: "Internal server error.",
	});
});

server.register(fastifyCors, { origin: "*" });

server.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Upload Server",
			version: "1.0.0",
		},
	},
	transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(authRoute);
server.register(createCommentRoute);
server.register(getCommentRepliesRoute);
server.register(getPostCommentsRoute);
server.register(postContentRoute);
server.register(listPostsRoute);

server.get("/", async () => ({ hello: "world" }));

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("HTTP server running");
});
