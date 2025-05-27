import prismaClient from "../../prisma";

export class GetLessonFrequencysService {
  async execute(classId: string, lessonId: string) {
    try {
      const classData = await prismaClient.class.findUnique({
        where: {
          id: classId,
        },
      });

      const lessonData = await prismaClient.lesson.findUnique({
        where: {
          id: lessonId,
        },
      });

      if (!classData || !lessonData) {
        return {
          success: false,
          message: "Turma ou aula não encontrada.",
        };
      }

      const frequencyList = await prismaClient.frequencyList.findMany({
        where: { classId, lessonId },
        include: {
          user: true,
        },
      });

      const students = frequencyList.map((item) => ({
        id: item.userId,
        aluno: item.user.name,
        igreja: item.user.church,
      }));

      return {
        success: true,
        message:
          students.length > 0
            ? "Lista de presença encontrada."
            : "Nenhum aluno presente nesta aula.",
        data: {
          turma: classData.name,
          aula: lessonData.name,
          students: students,
        },
      };
    } catch (err) {
      throw new Error(
        `Erro ao buscar lista de presença: ${(err as Error).message}`
      );
    }
  }
}
