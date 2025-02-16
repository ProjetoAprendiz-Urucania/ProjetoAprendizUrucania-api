import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateLessonController } from "../controllers/LessonController/CreateLessonController";
import { DeleteLessonController } from "../controllers/LessonController/DeleteLessonController";
import { GetLessonController } from "../controllers/LessonController/GetLessonController";
import { UpdateLessonController } from "../controllers/LessonController/UpdateLessonController";
import { GetLessonService } from "../services/LessonServices/GetLessonService";
import { ICreateLessonCard } from "../interfaces/ICreateLessonCard";

export async function lessonRoutes(fastify: FastifyInstance) {
    fastify.post<{
        Params: { classId: string };
        Body: ICreateLessonCard;
      }>("/class/:classId/lesson", async (req, res) => {
        const createLessonController = new CreateLessonController();
        return createLessonController.handle(req, res);
      });
    
      fastify.delete(
        "/class/:classId/:lessonId",
        async (req: FastifyRequest, res: FastifyReply) => {
          const { lessonId } = req.params as { lessonId: string };
    
          const lessonController = new DeleteLessonController();
          return lessonController.handle({ ...req, body: { lessonId } }, res);
        }
      );
    
      fastify.get(
        "/class/:classId/lesson",
        async (req: FastifyRequest, res: FastifyReply) => {
          return new GetLessonController().handle(req, res);
        }
      );
    
      fastify.get(
        "/class/:classId/:lessonId",
        async (req: FastifyRequest, res: FastifyReply) => {
          const { classId, lessonId } = req.params as {
            classId: string;
            lessonId: string;
          };
    
          const lessonService = new GetLessonService();
          const lesson = await lessonService.execute(classId, lessonId);
    
          res.send(lesson);
        }
      );
    
      fastify.put(
        "/class/:classId/:lessonId",
        async (req: FastifyRequest, res: FastifyReply) => {
          return new UpdateLessonController().handle(req, res);
        }
      );
}
