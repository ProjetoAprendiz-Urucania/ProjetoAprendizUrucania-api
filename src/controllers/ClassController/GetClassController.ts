import { FastifyRequest, FastifyReply } from "fastify";
import { GetClassService } from "../../services/ClassServices/GetClassService";

export class GetClassController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
    const getClassService = new GetClassService();
    try {
      if (!id) {
        const listClasses = await getClassService.execute();
        return res.status(200).send(listClasses);
      }

      const getById = await getClassService.execute(id);
      if (!getById) {
        return res.status(404).send({ message: "Class not found." });
      }

      res.status(200).send(getById);
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}
