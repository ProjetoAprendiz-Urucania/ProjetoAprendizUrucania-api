import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateClassService } from "../../services/ClassServices/UpdateClassService";
import { UploadClassPhotoService } from "../../services/ClassServices/UploadClassPhotoService";

export class UploadClassPhotoController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { classId } = req.params as { classId: string };
      const part = await req.file(); 

      if (!part || !part.mimetype.startsWith("image/")) {
        return res.status(400).send({ message: "Uploaded file is not a valid image." });
      }

      const uploadService = new UploadClassPhotoService();
      const classService = new UpdateClassService();

      const result = await uploadService.execute(classId, (async function* () {
        yield part;
      })()); 

      if (result.uploadedFiles.length === 0) {
        return res.status(500).send({ error: "Upload failed" });
      }

      const fileData = result.uploadedFiles[0];

      if (fileData.status === "success") {
        console.log(fileData.fileUrl);
        const updatedClass = await classService.execute(classId, {
          coverImage: fileData.fileUrl, 
        });

        return res.status(200).send({
          message: "Class photo uploaded successfully",
          updatedClass, 
        });
      }

      return res.status(500).send({ error: "Error processing file" });

    } catch (err) {
      console.error('Error in uploading class photo:', err); 
      res.status(500).send({ error: (err as Error).message });
    }
  }
}
