import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateStudentController } from "../controllers/StudentController/CreateStudentController";
import { DeleteStudentController } from "../controllers/StudentController/DeleteStudentController";
import { GetStudentController } from "../controllers/StudentController/GetStudentController";
import { UpdateStudentController } from "../controllers/StudentController/UpdateStudentController";
import { LoginController } from "../controllers/StudentController/LoginController";
import { UploadProfilePhotoController } from "../controllers/StudentController/UploadProfilePhotoController";
import { DeleteProfilePhotoController } from "../controllers/StudentController/DeleteProfilePhotoController";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/students",
    // { preHandler: [fastify.authenticate, fastify.isAdmin] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new GetStudentController().handle(req, res);
    }
  );

  fastify.get<{ Params: { studentId: string } }>(
    "/students/:studentId",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      const studentController = new GetStudentController();
      req.query = { studentId: req.params.studentId };
      return studentController.handle(req, res);
    }
  );

  fastify.get<{ Params: { email: string } }>(
    "/students/email/:email",
    { preHandler: [fastify.authenticate] },
    async (req, res) => {
      const studentController = new GetStudentController();
      req.query = { email: req.params.email };
      return studentController.handle(req, res);
    }
  );

  fastify.get<{ Params: { studentId: string } }>(
    "/profile/:studentId",
    // { preHandler: [fastify.authenticate] },
    async (req, res) => {
      const studentController = new GetStudentController();
      req.query = { studentId: req.params.studentId };
      return studentController.handle(req, res);
    }
  );

  fastify.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "email", "password", "church"],
          properties: {
            name: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            church: { type: "string", minLength: 3 },
          },
        },
      },
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await new CreateStudentController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  fastify.post(
    "/login",

    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await new LoginController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }
  );

  fastify.post(
    "/students/:studentId/profilePhoto",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UploadProfilePhotoController().handle(req, res);
    }
  );

  fastify.post<{ Params: { email: string } }>(
    "/forgot/email/:email",
    async (req, res) => {
      const studentController = new GetStudentController();
      req.query = { email: req.params.email };
      return studentController.handle(req, res);
    }
  );

  fastify.put(
    "/students/:studentId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UpdateStudentController().handle(req, res);
    }
  );

  fastify.put(
    "/profile/:studentId",
    // { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UpdateStudentController().handle(req, res);
    }
  );

  fastify.delete(
    "/students/:studentId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const { studentId } = req.params as { studentId: string };

      const studentController = new DeleteStudentController();
      return studentController.handle({ ...req, body: { studentId } }, res);
    }
  );

  fastify.delete(
    "/students/:studentId/profilePhoto",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new DeleteProfilePhotoController().handle(req, res);
    }
  );
}
