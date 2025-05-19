import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateLessonService } from "../../services/LessonServices/UpdateLessonService";
import { ICreateLessonCard } from "../../interfaces/ICreateLessonCard";

export class UpdateLessonController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { lessonId } = req.params as { lessonId: string };
      const { name, teacher, coverImage, lessonLink, theoryMaterials } =
        req.body as Partial<ICreateLessonCard>;

      if (!lessonId) {
        return res.status(400).send({ message: "Lesson ID is required." });
      }

      if (!name && !teacher && !coverImage && !lessonLink && !theoryMaterials) {
        return res.status(400).send({
          message:
            "At least one field (name, teacher, coverImage, lessonLink, or theoryMaterials) must be provided.",
        });
      }

      const lessonData: ICreateLessonCard = {
        name: name || "",
        teacher: teacher || "",
        coverImage: coverImage || "",
        lessonLink: lessonLink || "",
        theoryMaterials,
      };

      const lessonService = new UpdateLessonService();
      const updatedLesson = await lessonService.execute(lessonId, lessonData);

      return res.status(200).send(updatedLesson);
    } catch (err) {
      return res.status(500).send({ error: (err as Error).message });
    }
  }
}
