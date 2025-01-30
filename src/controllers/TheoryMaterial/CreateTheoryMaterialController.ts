import { FastifyRequest, FastifyReply } from "fastify";
import { ICreateTheoryMaterialCard } from "../../interfaces/ICreateTheoryMaterialCard";
import { CreateTheoryMaterialService } from "../../services/TheoryMaterial/CreateTheoryMaterialService";

export class CreateTheoryMaterialController {
  async handle(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const {lessonId} = req.params as {lessonId: string}
    const { name, fileUrl, fileType } = req.body as ICreateTheoryMaterialCard;

    const theoryMaterialService = new CreateTheoryMaterialService();

    try {
      const theoryMaterial = await theoryMaterialService.execute(lessonId,{
        name,
        fileUrl,
        fileType,
      });
      return res.status(200).send(theoryMaterial);
    } catch (err: any) {
      if (
        err.message.includes("Fill in all required fields")
      ) {
        return res.status(400).send({ error: err.message });
      } else {
        return res.status(500).send({ error: "Internal server error" });
      }
    }
  }
}