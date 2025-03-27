import prismaClient from "../../prisma";
import { IUpdateLessonCard } from "../../interfaces/IUpdateLessonCard";

export class UpdateLessonService {
  async execute(id: string, { name, teacher, coverImage, lessonLink }: IUpdateLessonCard) {
    try {
      const lessonCard = await prismaClient.lesson.findUnique({
        where: { id },
      });

      if (!lessonCard) {
        throw new Error("Lesson not found.");
      }

      const updatedData: Partial<IUpdateLessonCard> = {};
      if (name) updatedData.name = name;
      if (teacher) updatedData.teacher = teacher;
      if (coverImage) updatedData.coverImage = coverImage;
      if (lessonLink) updatedData.lessonLink = lessonLink;

      const updatedLesson = await prismaClient.lesson.update({
        where: { id },
        data: updatedData,
      });

      return updatedLesson;
    } catch (err) {
      throw new Error(`Lesson update error: ${(err as Error).message}`);
    }
  }
}
