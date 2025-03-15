import { FastifyInstance } from "fastify";

export async function awsRoutes(fastify: FastifyInstance) {
    fastify.get('/health', async (request, reply) => {
        return { status: 'ok' };
      });
}