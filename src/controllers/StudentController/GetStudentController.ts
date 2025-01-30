
import { FastifyRequest, FastifyReply } from "fastify";
import { GetStudentService } from "../../services/StudentServices/GetStudentService";

export class GetStudentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { studentId } = req.params as { studentId: string};
    const getStudentService = new GetStudentService();
    try {
      if (!studentId) {
        const listLessons = await getStudentService.execute();
        res.status(200).send(listLessons);
      }

      const getById = await getStudentService.execute(studentId);
      if (!getById) {
        return res.status(404).send({ message: "Student not found." });
      }

      res.status(200).send(getById);
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}