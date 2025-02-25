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
      }>("/classes/:classId/lesson", { preHandler: [fastify.authenticate] }, async (req, res) => {
        const createLessonController = new CreateLessonController();
        return createLessonController.handle(req, res);
      });
    
      fastify.delete(
        "/classes/:classId/:lessonId", { preHandler: [fastify.authenticate] },
        async (req: FastifyRequest, res: FastifyReply) => {
          const { lessonId } = req.params as { lessonId: string };
    
          const lessonController = new DeleteLessonController();
          return lessonController.handle({ ...req, body: { lessonId } }, res);
        }
      );
    
      fastify.get(
        "/classes/:classId/lessons", { preHandler: [fastify.authenticate] },
        async (req: FastifyRequest, res: FastifyReply) => {
          return new GetLessonController().handle(req, res);
        }
      );
    
      fastify.get(
        "/classes/:classId/:lessonId", { preHandler: [fastify.authenticate] },
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
        "/classes/:classId/:lessonId", { preHandler: [fastify.authenticate] },
        async (req: FastifyRequest, res: FastifyReply) => {
          return new UpdateLessonController().handle(req, res);
        }
      );
}
