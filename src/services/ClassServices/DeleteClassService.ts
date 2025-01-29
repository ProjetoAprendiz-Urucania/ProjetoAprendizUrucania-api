import { ObjectId } from "mongodb";
import prismaClient from "../../prisma";

export class DeleteClassService {
  async execute(id: string) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format.");
      }

      const classData = await prismaClient.class.findUnique({
        where: { id },
      });

      if (!classData) {
        throw new Error("Class not found.");
      }

      return await prismaClient.class.delete({ where: { id } });
    } catch (err) {
      throw new Error(`Error deleting class: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
