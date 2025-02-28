import { FastifyRequest, FastifyReply } from "fastify";
import { UploadTheoryMaterialService } from "../../services/TheoryMaterial/UploadTheoryMaterialService";
import { CreateTheoryMaterialService } from "../../services/TheoryMaterial/CreateTheoryMaterialService";
import { Multipart, MultipartFile } from "@fastify/multipart"; // Importando MultipartFile corretamente

export class UploadTheoryMaterialController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { lessonId } = req.params as { lessonId: string };

      if (!lessonId) {
        return res.status(400).send({ message: "LessonId is required" });
      }

      const data = req.parts(); 
      let customName = "";
      const fileParts: Multipart[] = [];

      async function* fileIterator() {
        for await (const part of data) {
          if (part.type === "file") {
            yield part as MultipartFile; 
            fileParts.push(part);
          } else if (part.type === "field" && part.fieldname === "name") {
            customName = String(part.value); 
          }
        }
      }

      const uploadService = new UploadTheoryMaterialService();
      const createTheoryMaterialService = new CreateTheoryMaterialService();

      const result = await uploadService.execute(lessonId, fileIterator()); 

      if (result.uploadedFiles.length === 0) {
        return res.status(500).send({ error: "Upload failed" });
      }

      const file = result.uploadedFiles[0];

      if (file.status === "success") {
        const theoryMaterial = await createTheoryMaterialService.execute(lessonId, {
          name: customName || file.filename,
          fileUrl: file.fileUrl,
          fileType: file.fileType,
        });

        return res.status(200).send({
          message: "File processed successfully",
          uploadedMaterial: theoryMaterial,
        });
      }

      return res.status(500).send({ error: "Error processing file" });

    } catch (err) {
      res.status(500).send({ error: (err as Error).message });
    }
  }
}
