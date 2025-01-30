import { FastifyRequest, FastifyReply } from "fastify";
import { GetLessonService } from "../../services/LessonServices/GetLessonService";

export class GetLessonController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { lessonId,classId } = req.params as { lessonId: string,classId: string };
    const getLessonService = new GetLessonService();
    try {
      if (!lessonId) {
        const listLessons = await getLessonService.execute(classId,lessonId);
        res.status(200).send(listLessons);
      }

      const getById = await getLessonService.execute(classId,lessonId);
      if (!getById) {
        return res.status(404).send({ message: "Lesson or class not found." });
      }

      res.status(200).send(getById);
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}