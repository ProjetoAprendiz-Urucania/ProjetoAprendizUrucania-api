import prismaClient from "../../prisma";

export class GetLessonFrequencysService {
  async execute(classId: string, lessonId: string) {
    try {
      const frequencyList = await prismaClient.frequencyList.findMany({
        where: { classId, lessonId },
        include: {
          user: true,
        },
      });

      const [classData, lessonData] = await Promise.all([
        prismaClient.class.findUnique({
          where: { id: classId },
          select: { name: true },
        }),

        prismaClient.lesson.findUnique({
          where: { id: lessonId },
          select: { name: true },
        }),
      ]);

      if (!classData || !lessonData) {
        throw new Error("Turma ou aula não encontrada.");
      }

      const students = frequencyList.map((item) => ({
        id: item.userId,
        aluno: item.user.name,
        igreja: item.user.church,
      }));

      return {
        success: true,
        message: "Lista de presença encontrada.",
        data: {
          turma: classData.name,
          aula: lessonData.name,
          students: students,
        },
      };
    } catch (err) {
      console.error(err);

      throw new Error(
        `Erro ao buscar lista de presença: ${(err as Error).message}`
      );
    }
  }
}
