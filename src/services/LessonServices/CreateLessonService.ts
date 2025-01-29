import prismaClient from "../../prisma";
import { ICreateLessonCard } from "../../interfaces/ICreateLessonCard";

export class CreateLessonService {
  async execute(
    classId: string,
    { name, teacher, coverImage, lessonLink, theoryMaterials }: ICreateLessonCard
  ) {
    try {
      if (
        !name?.trim() ||
        !teacher?.trim() ||
        !coverImage?.trim() ||
        !lessonLink?.trim()
      ) {
        throw new Error("Fill in all required fields.");
      }

      const classExists = await prismaClient.class.findUnique({
        where: { id: classId },
      });

      if (!classExists) {
        throw new Error("Class not found.");
      }

      const newLesson = await prismaClient.lesson.create({
        data: {
          name,
          teacher,
          coverImage,
          lessonLink,
          updated_at: new Date(),
          theoryMaterials: theoryMaterials 
            ? theoryMaterials
            : undefined,
          class: {
            connect: { id: classId },
          },
        },
      });
      

      return newLesson;
    } catch (err) {
      throw new Error(
        `Error creating lesson: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }
}