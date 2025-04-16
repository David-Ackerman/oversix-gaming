import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import Fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { transformSwaggerSchema } from "./transform-swagger-schema";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authRoute } from "./routes/auth-route";

const server = Fastify();

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)


server.setErrorHandler((error, request, reply) => {
  console.error(error)
  
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }


  return reply.status(500).send({
    message: 'Internal server error.',
  })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(authRoute);

server.get("/", async () => ({ hello: "world" }));

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running')
})
