
import { FastifyRequest, FastifyReply } from "fastify";
import { GetTheoryMaterialService } from "../../services/TheoryMaterial/GetTheoryMaterialService.";

export class GetTheoryMaterialController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { theoryMaterialId } = req.params as { theoryMaterialId: string};
    const getTheoryMaterialService = new GetTheoryMaterialService();
    try {
      if (!theoryMaterialId) {
        const listLessons = await getTheoryMaterialService.execute();
        res.status(200).send(listLessons);
      }

      const getById = await getTheoryMaterialService.execute(theoryMaterialId);
      if (!getById) {
        return res.status(404).send({ message: "Theory Material not found." });
      }

      res.status(200).send(getById);
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}