import prismaClient from "../../prisma";

export class GetLessonService {
  async execute(classId: string, lessonId: string) {
    try {
      if (lessonId) {
        const lessonData = await prismaClient.lesson.findUnique({
          where: {
            id: lessonId, 
          },
        });

        if (!lessonData) {
          throw new Error('Lesson not found');
        }

        return lessonData;
      }

      const lessons = await prismaClient.lesson.findMany({
        where: {
          classId: classId,
        },
      });

      if (lessons.length === 0) {
        throw new Error('Lessons not found');
      }

      return lessons;
    } catch (err) {
      throw new Error(`Erro ao buscar aula(s): ${(err as Error).message}`);
    }
  }
}
