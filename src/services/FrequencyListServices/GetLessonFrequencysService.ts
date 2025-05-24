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

    if (!frequencyList) {
        return {
            success: false,
            message: "Não há presenças registradas.",
        };
    }

      const classData = await prismaClient.class.findUnique({
        where: {
            id: classId 
        }
    })


    const lessonData = await prismaClient.lesson.findUnique({
        where: {
            id: lessonId 
        }
    })

      return {
        success: true,
        message: "Lista de presença encontrada.",
        data: { 
          turma: classData?.name,
          aula: lessonData?.name,
          students: frequencyList.map((item) => ({
            aluno: item.user.name,
            igreja: item.user.church,
          })),},
      };
    } catch (err) {
      throw new Error(`Erro ao buscar lista de presença: ${(err as Error).message}`);
    }
  }
}
