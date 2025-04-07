import { FastifyRequest, FastifyReply } from "fastify";
import { ConfirmPresenceService } from "../../services/FrequencyListServices/ConfirmPresenceService";

export class ConfirmPresenceController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId, lessonId, userId } = req.params as {
        classId?: string;
        lessonId?: string;
        userId?: string;
      };

      if (!classId || !lessonId || !userId) {
        return res.status(400).send({
          success: false,
          message: "classId, lessonId e userId são obrigatórios.",
        });
      }

      const confirmPresenceService = new ConfirmPresenceService();
      const result = await confirmPresenceService.execute(classId, lessonId, userId);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: `Erro ao confirmar presença: ${(error as Error).message}`,
      });
    }
  }
}
