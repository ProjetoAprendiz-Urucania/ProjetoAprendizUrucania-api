import { FastifyReply, FastifyRequest } from "fastify";
import { ICreateTheoryMaterialCard } from "../../interfaces/ICreateTheoryMaterialCard";
import { UpdateTheoryMaterialService } from "../../services/TheoryMaterial/UpdateTheoryMaterialService.";

export class UpdateTheoryMaterialController {
    async handle(req: FastifyRequest, res: FastifyReply) {
      try {
        console.log("Request body:", req.body);

        const { theoryMaterialId } = req.params as { theoryMaterialId: string };
        const { name, fileUrl, fileType } =
          req.body as ICreateTheoryMaterialCard;
  
        if (!theoryMaterialId) {
          res.status(400).send({ message: "Theory Material ID is required." });
        }
  
        if (!name && !fileUrl && !fileType) {
          res.status(400).send({
            message: "At least one field (name, fileUrl or fileType) must be provided.",
          });
        }
  
        const theoryMaterialData: ICreateTheoryMaterialCard = {
          name: "",
          fileUrl: "",
          fileType: ""
        };
        
        if (name) theoryMaterialData.name = name;
        if (fileUrl) theoryMaterialData.fileUrl = fileUrl;
        if (fileType) theoryMaterialData.fileType = fileType;
  
        const studentService = new UpdateTheoryMaterialService();
        const updatedStudent = await studentService.execute(theoryMaterialId, theoryMaterialData);
  
        res.status(200).send(updatedStudent);
      } catch (err) {
        res.status(500).send({ error: (err as Error).message });
      }
    }
  }