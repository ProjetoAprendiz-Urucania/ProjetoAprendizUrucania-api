import { FastifyRequest, FastifyReply } from "fastify";
import { CreateLessonService } from "../../services/LessonServices/CreateLessonService";
import { ICreateLessonCard } from "../../interfaces/ICreateLessonCard";

export class CreateLessonController {
  async handle(
    req: FastifyRequest<{
      Params: { classId: string };
      Body: ICreateLessonCard;
    }>,
    res: FastifyReply
  ) {
    const { classId } = req.params;

    const { name, teacher, coverImage, lessonLink, theoryMaterials } = req.body;

    const lessonService = new CreateLessonService();

    try {
      const lessonData = await lessonService.execute(classId, {
        name,
        teacher,
        coverImage,
        lessonLink,
        theoryMaterials,
      });
      return res.status(200).send(lessonData);
    } catch (err: any) {
      if (
        err.message.includes("Fill in all required fields") ||
        err.message.includes("Class not found")
      ) {
        return res.status(400).send({ error: err.message });
      } else {
        return res.status(500).send({ error: "Internal server error" });
      }
    }
  }
}