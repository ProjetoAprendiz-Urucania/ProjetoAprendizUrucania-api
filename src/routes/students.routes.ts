import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { CreateStudentController } from "../controllers/StudentController/CreateStudentController";
import { DeleteStudentController } from "../controllers/StudentController/DeleteStudentController";
import { GetStudentController } from "../controllers/StudentController/GetStudentController";
import { UpdateStudentController } from "../controllers/StudentController/UpdateStudentController";
import { LoginController } from "../controllers/StudentController/LoginController";

export async function studentRoutes(fastify: FastifyInstance) {
  fastify.post("/register", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateStudentController().handle(req, res);
  });

  fastify.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new LoginController().handle(req, res);
    }
  );

  fastify.delete(
    "/students/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { studentId } = req.params as { studentId: string };

      const studentController = new DeleteStudentController();
      return studentController.handle({ ...req, body: { studentId } }, res);
    }
  );

  fastify.get("/students", async (req: FastifyRequest, res: FastifyReply) => {
    return new GetStudentController().handle(req, res);
  });

  fastify.get(
    "/students/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { studentId } = req.params as { studentId: string };

      const studentController = new GetStudentController();
      const data = await studentController.handle(
        { ...req, body: { studentId } },
        res
      );

      res.send(data);
    }
  );

  fastify.put(
    "/config/editStudent/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UpdateStudentController().handle(req, res);
    }
  );
}
