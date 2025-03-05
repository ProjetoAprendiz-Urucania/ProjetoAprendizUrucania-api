import { FastifyRequest, FastifyReply } from "fastify";
import { UploadProfilePhotoService } from "../../services/StudentServices/UploadProfilePhotoService"; 
import { UpdateStudentService } from "../../services/StudentServices/UpdateStudentService";

export class UploadProfilePhotoController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { studentId } = req.params as { studentId: string };

      if (!studentId) {
        return res.status(400).send({ message: "StudentId is required" });
      }

      const part = await req.file(); 

      if (!part || !part.mimetype.startsWith("image/")) {
        return res.status(400).send({ message: "Uploaded file is not a valid image." });
      }

      const uploadService = new UploadProfilePhotoService();
      const studentService = new UpdateStudentService();

      const result = await uploadService.execute(studentId, (async function* () {
        yield part;
      })()); 

      if (result.uploadedFiles.length === 0) {
        return res.status(500).send({ error: "Upload failed" });
      }

      const file = result.uploadedFiles[0];

      if (file.status === "success") {
        const updatedStudent = await studentService.execute(studentId, {
          profilePicture: file.fileUrl, 
        });

        return res.status(200).send({
          message: "Profile photo uploaded successfully",
          updatedStudent, 
        });
      }

      return res.status(500).send({ error: "Error processing file" });

    } catch (err) {
      res.status(500).send({ error: (err as Error).message });
    }
  }
}