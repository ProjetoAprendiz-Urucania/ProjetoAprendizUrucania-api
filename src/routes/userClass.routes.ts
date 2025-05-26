import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { AddStudentToClassController } from "../controllers/UserClassController/AddStudentToClassController";
import { GetUserClassController } from "../controllers/UserClassController/GetUserClassController";
import { DeleteStudentToClassController } from "../controllers/UserClassController/DeleteStudentToClassController";
import { GetClassStudentsController } from "../controllers/UserClassController/GetClassStudentsController";

export async function userClassRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/userClass/:classId/:userId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        console.log("req.params", req.params);
        await new AddStudentToClassController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  fastify.delete(
    "/userClass/:classId/:userId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        console.log("req.params", req.params);
        await new DeleteStudentToClassController().handle(req, res);
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

   fastify.get(
    "/userClass/:classId/students",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await new GetClassStudentsController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );
}
