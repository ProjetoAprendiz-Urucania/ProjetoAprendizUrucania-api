import { FastifyRequest, FastifyReply } from "fastify";
import { CreateClassService } from "../../services/ClassServices/CreateClassService";
import { ICreateClassDTO } from "../../interfaces/ICreateClassDTO";

export class CreateClassController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { name, teachers, coverImage } = req.body as ICreateClassDTO;

    const classService = new CreateClassService();

    try {
      const classData = await classService.execute({ name, teachers, coverImage });
      return res.status(200).send(classData);
    } catch (err: any) {
      return res.status(500).send({ err: err.message });
    }
  }
}