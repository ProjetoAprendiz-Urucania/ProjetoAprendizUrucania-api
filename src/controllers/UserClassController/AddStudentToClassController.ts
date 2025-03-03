import { FastifyRequest, FastifyReply } from "fastify";
import { AddStudentToClassService } from "../../services/UserClassServices/AddStudentToClassService";

export class AddStudentToClassController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId, userId } = req.params as {
        classId?: string;
        userId?: string;
      };

      if (!classId || !userId) {
        return res.status(400).send({ error: "classId and userId are required" });
      }

      const addStudentToClassService = new AddStudentToClassService();
      const result = await addStudentToClassService.execute(classId,userId);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ error: `Failed to add student: ${(error as Error).message}` });
    }
  }
}
