import { FastifyRequest, FastifyReply } from "fastify";
import { GetLessonFrequencysService } from "../../services/FrequencyListServices/GetLessonFrequencysService";

export class GetLessonFrequencysController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId, lessonId } = req.params as {
        classId?: string;
        lessonId?: string;
      };

      if (!classId || !lessonId ) {
        return res.status(400).send({
          success: false,
          message: "classId, lessonId são obrigatórios.",
        });
      }

      const getLessonFrequencys = new GetLessonFrequencysService();
      const result = await getLessonFrequencys.execute(classId, lessonId);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: `Erro ao buscar lista de presença: ${(error as Error).message}`,
      });
    }
  }
}
