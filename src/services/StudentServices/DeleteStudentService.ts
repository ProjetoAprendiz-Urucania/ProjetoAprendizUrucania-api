import { ObjectId } from "mongodb";
import prismaClient from "../../prisma";

export class DeleteStudentService {
  async execute(id: string) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format.");
      }

      const studentData = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!studentData) {
        throw new Error("Student not found.");
      }

      return await prismaClient.user.delete({ where: { id } });
    } catch (err) {
      throw new Error(`Error deleting student: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
