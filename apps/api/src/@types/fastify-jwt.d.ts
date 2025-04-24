import "@fastify/jwt";

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: { userId: string }; // Payload you sign
		user: { userId: string }; // Result of request.jwtVerify()
	}
}
