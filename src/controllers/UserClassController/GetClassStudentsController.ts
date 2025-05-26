import { FastifyRequest, FastifyReply } from "fastify";
import { GetClassStudentsService } from "../../services/UserClassServices/GetClassStudentsService";

export class GetClassStudentsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId } = req.params as { classId?: string };

      const userClassService = new GetClassStudentsService();
      const result = await userClassService.execute(classId);
      return res.status(200).send(result);
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Failed to fetch user classes: ${(error as Error).message}` });
    }
  }
}
