import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ConfirmPresenceController } from "../controllers/FrequencyListController/ConfirmPresenceController";

export async function frequencyList(fastify: FastifyInstance) {
  fastify.post(
    "/frequencyList/:classId/:lessonId/:userId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await new ConfirmPresenceController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );
}
