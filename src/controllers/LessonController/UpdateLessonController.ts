import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateLessonService } from "../../services/LessonServices/UpdateLessonService";
import { IUpdateLessonCard } from "../../interfaces/IUpdateLessonCard";

export class UpdateLessonController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { lessonId } = req.params as { lessonId: string };
    const { name, teacher, lessonLink, theoryMaterials } =
      req.body as Partial<IUpdateLessonCard>;

    try {
      const lessonData: Partial<IUpdateLessonCard> = {};
      if (name !== undefined) lessonData.name = name;
      if (teacher !== undefined) lessonData.teacher = teacher;
      if (lessonLink !== undefined) lessonData.lessonLink = lessonLink;
      if (theoryMaterials !== undefined)
        lessonData.theoryMaterials = theoryMaterials;

      const lessonService = new UpdateLessonService();
      const updatedLesson = await lessonService.execute(lessonId, lessonData);

      return res.status(200).send(updatedLesson);
    } catch (err) {
      return res.status(500).send({ error: (err as Error).message });
    }
  }
}
