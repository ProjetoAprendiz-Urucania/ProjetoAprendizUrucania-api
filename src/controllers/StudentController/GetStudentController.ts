import { FastifyRequest, FastifyReply } from "fastify";
import { GetStudentService } from "../../services/StudentServices/GetStudentService";

export class GetStudentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { studentId, email } = req.query as {
      studentId?: string;
      email?: string;
    };

    const getStudentService = new GetStudentService();

    try {
      if (!studentId && !email) {
        const students = await getStudentService.execute();
         res.status(200).send(students);
      }

      if (studentId) {
        const getById = await getStudentService.execute(studentId, undefined);
        if (!getById) {
          return res.status(404).send({ message: "Student not found." });
        }
         res.status(200).send(getById);
      }

      if (email) {
        const getByEmail = await getStudentService.execute(undefined, email);
        if (!getByEmail) {
           res.status(404).send({ message: "Student not found." });
        }
        getByEmail.password = ""
        res.status(200).send(getByEmail);
      }
    } catch (err: any) {
       res.status(500).send({ message: err.message });
    }
  }
}
