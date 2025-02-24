
import { FastifyRequest, FastifyReply } from "fastify";
import { GetTheoryMaterialService } from "../../services/TheoryMaterial/GetTheoryMaterialService.";

export class GetTheoryMaterialController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { lessonId } = req.params as { lessonId: string};
    const getTheoryMaterialService = new GetTheoryMaterialService();
    try {
      if (!lessonId) {
        const materialsList = await getTheoryMaterialService.execute();
        res.status(200).send(materialsList);
      }

      const getById = await getTheoryMaterialService.execute(lessonId);
      if (!getById) {
        return res.status(404).send({ message: "Theory Material not found." });
      }

      res.status(200).send(getById);
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}