import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateClassController } from "../controllers/ClassController/CreateClassController";
import { DeleteClassController } from "../controllers/ClassController/DeleteClassController";
import { GetClassController } from "../controllers/ClassController/GetClassController";
import { UpdateClassController } from "../controllers/ClassController/UpdateClassController";
import { CreateLessonController } from "../controllers/LessonController/CreateLessonController";
import { ICreateLessonCard } from "../interfaces/ICreateLessonCard";
import { DeleteLessonController } from "../controllers/LessonController/DeleteLessonController";

export async function routes(fastify: FastifyInstance) {
  fastify.post("/class", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateClassController().handle(req, res);
  });

  fastify.delete(
    "/class/:id",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { id } = req.params as { id: string };

      const classController = new DeleteClassController();
      return classController.handle({ ...req, body: { id } }, res);
    }
  );

  fastify.get("/class", async (req: FastifyRequest, res: FastifyReply) => {
    return new GetClassController().handle(req, res);
  });

  fastify.get("/class/:id", async (req: FastifyRequest, res: FastifyReply) => {
    return new GetClassController().handle(req, res);
  });

  fastify.put("/class/:id", async (req: FastifyRequest, res: FastifyReply) => {
    return new UpdateClassController().handle(req, res);
  });

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
}
