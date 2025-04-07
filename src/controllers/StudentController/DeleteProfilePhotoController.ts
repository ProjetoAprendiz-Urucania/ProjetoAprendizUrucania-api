import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteProfilePhotoService } from "../../services/StudentServices/DeleteProfilePhotoService";

export class DeleteProfilePhotoController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { studentId } = req.params as { studentId: string };

      if (!studentId) {
        return res.status(400).send({ message: "StudentId is required" });
      }

      const deleteService = new DeleteProfilePhotoService();

      const result = await deleteService.execute(studentId);

      return res.send(result);
    } catch (err) {
      console.error("Error in uploading profile photo:", err);
      res.status(500).send({ error: (err as Error).message });
    }
  }
}
