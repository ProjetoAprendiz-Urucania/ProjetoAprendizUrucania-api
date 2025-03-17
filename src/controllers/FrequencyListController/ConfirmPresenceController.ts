import { FastifyRequest, FastifyReply } from "fastify";
import { ConfirmPresenceService } from "../../services/FrequencyListServices/ConfirmPresenceService";

export class ConfirmPresenceController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId, lessonId, userId } = req.params as {
        classId?: string;
        userId?: string;
        lessonId?: string;
      };

      if (!classId || !userId || !lessonId) {
        return res.status(400).send({ error: "classId,lessonId and userId are required" });
      }

      const confirmPresenceService = new ConfirmPresenceService();
      const result = await confirmPresenceService.execute(classId,lessonId,userId);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ error: `Failed to add student: ${(error as Error).message}` });
    }
  }
}
