import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { AddStudentToClassController } from "../controllers/UserClassController/AddStudentToClassController";
import { GetUserClassController } from "../controllers/UserClassController/GetUserClassController";

export async function userClassRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/userClass/:classId/:userId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await new AddStudentToClassController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  fastify.get(
    "/userClass/:userId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await new GetUserClassController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );
}
