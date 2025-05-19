import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateLessonService } from "../../services/LessonServices/UpdateLessonService";
import { UploadLessonPhotoService } from "../../services/LessonServices/UploadClassPhotoService";

export class UploadLessonPhotoController {
  async handle(req: FastifyRequest, res: FastifyReply) {
          
    try {
      const { lessonId } = req.params as { lessonId: string };

      const part = await req.file(); 

      if (!part || !part.mimetype.startsWith("image/")) {
        return res.status(400).send({ message: "Uploaded file is not a valid image." });
      }

      const uploadService = new UploadLessonPhotoService();
      const lessonService = new UpdateLessonService();

      const result = await uploadService.execute(lessonId, (async function* () {
        yield part;
      })()); 

      if (result.uploadedFiles.length === 0) {
        return res.status(500).send({ error: "Upload failed" });
      }

      const fileData = result.uploadedFiles[0];

      if (fileData.status === "success") {
        console.log(fileData.fileUrl);
        const updatedStudent = await lessonService.execute(lessonId, {
          coverImage: fileData.fileUrl, 
        });

        return res.status(200).send({
          message: "Profile photo uploaded successfully",
          updatedStudent, 
        });
      }

      return res.status(500).send({ error: "Error processing file" });

    } catch (err) {
      console.error('Error in uploading profile photo:', err); 
      res.status(500).send({ error: (err as Error).message });
    }
  }
}
