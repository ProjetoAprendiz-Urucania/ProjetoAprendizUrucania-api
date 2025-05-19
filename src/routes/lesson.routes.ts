import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateLessonController } from "../controllers/LessonController/CreateLessonController";
import { DeleteLessonController } from "../controllers/LessonController/DeleteLessonController";
import { GetLessonController } from "../controllers/LessonController/GetLessonController";
import { UpdateLessonController } from "../controllers/LessonController/UpdateLessonController";
import { GetLessonService } from "../services/LessonServices/GetLessonService";
import { ICreateLessonCard } from "../interfaces/ICreateLessonCard";
import { UploadLessonPhotoController } from "../controllers/LessonController/UploadLessonPhotoController";

export async function lessonRoutes(fastify: FastifyInstance) {
    fastify.post<{
        Params: { classId: string };
        Body: ICreateLessonCard;
      }>("/classes/:classId/lesson", { preHandler: [fastify.authenticate,fastify.isAdmin] },
        async (req, res) => {
        const createLessonController = new CreateLessonController();
        return createLessonController.handle(req, res);
      });
    
      fastify.delete(
        "/classes/:classId/:lessonId",
        { preHandler: [fastify.authenticate, fastify.isAdmin] },
        async (req: FastifyRequest, res: FastifyReply) => {
          console.log("Requisição DELETE recebida!");
          console.log("Parâmetros:", req.params);
      
        
      
          try {
            const lessonController = new DeleteLessonController();
            return lessonController.handle(req, res);
          } catch (error) {
            console.error("Erro no controlador:", error);
            return res.status(500).send({ error: "Erro ao excluir a lição" });
          }
        }
      );
      

      fastify.post("/classes/:classId/:lessonId/uploadPhoto",
        { preHandler: [fastify.authenticate, fastify.isAdmin] },
 
          async (req: FastifyRequest, res: FastifyReply) => {
          return new UploadLessonPhotoController().handle(req, res);
        });
    
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
        "/classes/:classId/:lessonId", { preHandler: [fastify.authenticate,fastify.isAdmin] },

        async (req: FastifyRequest, res: FastifyReply) => {
          return new UpdateLessonController().handle(req, res);
        }
      );
}
