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

      const classExist = await prismaClient.class.findUnique({
        where: { id: classId },
      });

      if (!classExist) {
        throw new Error("Class not found.");
      }

      const newLesson = await prismaClient.lesson.create({
        data: {
          name,
          teacher,
          coverImage,
          lessonLink,
          updated_at: new Date(),
          class: { connect: { id: classId } },
          TheoryMaterial: theoryMaterials?.length
            ? { create: theoryMaterials }
            : undefined,
        },
      });

      return newLesson;
    } catch (err) {
      throw new Error(
        `Error creating lesson: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}
