import { FastifyRequest, FastifyReply } from "fastify";
import { GetLessonService } from "../../services/LessonServices/GetLessonService";

export class GetLessonController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { lessonId,classId } = req.params as { lessonId: string,classId: string };
    const getLessonService = new GetLessonService();
    try {
      if (!lessonId) {
        const listLessons = await getLessonService.execute(classId);
        return res.status(200).send(listLessons);
      }

      const getByClassId = await getLessonService.execute(classId,lessonId);
      return res.status(200).send(getByClassId);
    } catch (err: any) {
     if(err.message.includes('ClassId is required')){
      res.status(400).send({ message: err.message });
     }else if(err.message.includes('Lesson not found')){
      res.status(404).send({ message: err.message });
     }else if(err.message.includes('Lessons not found')){
      res.status(404).send({ message: err.message });
     }else{
      res.status(500).send({ message: err.message });
     }
     
    }

  }
}