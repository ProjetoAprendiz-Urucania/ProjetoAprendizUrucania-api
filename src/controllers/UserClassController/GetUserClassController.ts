import { FastifyRequest, FastifyReply } from "fastify";
import { GetUserClassService } from "../../services/UserClassServices/GetUserClassService";

export class GetUserClassController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId } = req.params as { userId?: string };

      const userClassService = new GetUserClassService();
      const result = await userClassService.execute(userId);

      return res.status(200).send(result);
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Failed to fetch user classes: ${(error as Error).message}` });
    }
  }
}
