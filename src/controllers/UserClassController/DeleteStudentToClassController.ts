import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteStudentToClassService } from "../../services/UserClassServices/DeleteStudentToClassService";

export class DeleteStudentToClassController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId, userId } = req.params as {
        classId?: string;
        userId?: string;
      };

      console.log("classId", classId);
      console.log("userId", userId);  
      if (!classId || !userId) {
        return res.status(400).send({ error: "classId and userId are required" });
      }

      const deleteStudentToClassService = new DeleteStudentToClassService();
      const result = await deleteStudentToClassService.execute(classId,userId);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ error: `Failed to add student: ${(error as Error).message}` });
    }
  }
}
