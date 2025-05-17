import { FastifyRequest, FastifyReply } from "fastify";
import { GetTheoryMaterialService } from "../../services/TheoryMaterialServices/GetTheoryMaterialService.";

export class GetTheoryMaterialController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId, lessonId, theoryMaterialId } = req.params as {
        classId: string;
        lessonId?: string;
        theoryMaterialId?: string;
      };

      const getTheoryMaterialService = new GetTheoryMaterialService();

      if (theoryMaterialId && lessonId) {
        const material = await getTheoryMaterialService.execute(classId, lessonId, theoryMaterialId);
        if (!material) {
          return res.status(404).send({ message: "Theory Material not found." });
        }
        return res.status(200).send(material);
      }

      if (lessonId) {
        const materials = await getTheoryMaterialService.execute(classId, lessonId);
        if (!materials) {
          return res.status(404).send({ message: "No Theory Materials found." });
        }
        return res.status(200).send(materials);
      }

      const materials = await getTheoryMaterialService.execute(classId);
      return res.status(200).send(materials);

    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  }
}
