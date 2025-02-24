import { FastifyRequest, FastifyReply } from "fastify";
import { GetStudentService } from "../../services/StudentServices/GetStudentService";

export class GetStudentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { studentId, email } = req.query as { studentId?: string; email?: string };

    const getStudentService = new GetStudentService();
    try {
      if (!studentId && !email) {
        const students = await getStudentService.execute();
        return res.status(200).send(students);
      }

      if (studentId) {
        const getById = await getStudentService.execute(studentId);
        if (!getById) {
          return res.status(404).send({ message: "Student not found." });
        }
        return res.status(200).send(getById);
      }

      if (email) {
        const getByEmail = await getStudentService.execute(email);
        if (!getByEmail) {
          return res.status(404).send({ message: "Student not found." });
        }
        return res.status(200).send(getByEmail);
      }
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}
