import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateClassController } from "../controllers/ClassController/CreateClassController";
import { DeleteClassController } from "../controllers/ClassController/DeleteClassController";
import { GetClassController } from "../controllers/ClassController/GetClassController";
import { UpdateClassController } from "../controllers/ClassController/UpdateClassController";
import { CreateLessonController } from "../controllers/LessonController/CreateLessonController";
import { ICreateLessonCard } from "../interfaces/ICreateLessonCard";
import { DeleteLessonController } from "../controllers/LessonController/DeleteLessonController";
import { GetLessonController } from "../controllers/LessonController/GetLessonController";
import { UpdateLessonController } from "../controllers/LessonController/UpdateLessonController";
import { GetLessonService } from "../services/LessonServices/GetLessonService";
import { CreateStudentController } from "../controllers/StudentController/CreateStudentController";
import { DeleteStudentController } from "../controllers/StudentController/DeleteStudentController";
import { GetStudentController } from "../controllers/StudentController/GetStudentController";
import { UpdateStudentController } from "../controllers/StudentController/UpdateStudentController";

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

  fastify.get(
    "/class/:classId/lesson",
    async (req: FastifyRequest, res: FastifyReply) => {
      return new GetLessonController().handle(req, res);
    }
  );

  fastify.get(
    "/class/:classId/:lessonId",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { classId, lessonId } = req.params as { classId: string, lessonId: string };
  
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

  fastify.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateStudentController().handle(req, res);
  });
  
  fastify.delete(
    "/students/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { studentId } = req.params as { studentId: string };

      const studentController = new DeleteStudentController();
      return studentController.handle({ ...req, body: { studentId } }, res);
    }
  );

  fastify.get(
    "/students",
    async (req: FastifyRequest, res: FastifyReply) => {
      return new GetStudentController().handle(req,res);
    }
  );

  fastify.get(
    "/students/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { studentId } = req.params as { studentId: string };
  
      const studentController = new GetStudentController();
      const data = await studentController.handle({ ...req, body: { studentId } },res);
  
      res.send(data);
    }
  );

  fastify.put(
    "/editStudent/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UpdateStudentController().handle(req, res);
    }
  );
}
