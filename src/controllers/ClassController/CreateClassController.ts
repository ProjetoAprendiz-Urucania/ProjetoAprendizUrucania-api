import { FastifyRequest, FastifyReply } from "fastify";
import { CreateClassService } from "../../services/ClassServices/CreateClassService";
import { ICreateClassCard } from "../../interfaces/ICreateClassCard";

export class CreateClassController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { name, teachers } = req.body as ICreateClassCard;

    const classService = new CreateClassService();

    try {
      const classData = await classService.execute({ name, teachers });
      return res.status(200).send(classData);
    } catch (err: any) {
      return res.status(500).send({ err: err.message });
    }
  }
}