import { ObjectId } from "mongodb";
import prismaClient from "../../prisma";

export class DeleteLessonService {
  async execute(id: string) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format.");
      }

      const lessonData = await prismaClient.lesson.findUnique({
        where: { id },
      });

      if (!lessonData) {
        throw new Error("Lesson not found.");
      }

      return await prismaClient.lesson.delete({ where: { id } });
    } catch (err) {
      throw new Error(`Error deleting lesson: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
