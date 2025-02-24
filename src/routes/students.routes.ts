import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { CreateStudentController } from "../controllers/StudentController/CreateStudentController";
import { DeleteStudentController } from "../controllers/StudentController/DeleteStudentController";
import { GetStudentController } from "../controllers/StudentController/GetStudentController";
import { UpdateStudentController } from "../controllers/StudentController/UpdateStudentController";
import { LoginController } from "../controllers/StudentController/LoginController";

export async function studentRoutes(fastify: FastifyInstance) {
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
      try {
        await new LoginController().handle(req, res);
      } catch (error) {
        return res.status(400).send({
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
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
    "/students/:studentId",
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UpdateStudentController().handle(req, res);
    }
  );
}
