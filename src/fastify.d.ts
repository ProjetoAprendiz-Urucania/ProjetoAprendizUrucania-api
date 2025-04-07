import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
    isAdmin: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    files(): AsyncIterable<import("formidable").File>;
  }
}