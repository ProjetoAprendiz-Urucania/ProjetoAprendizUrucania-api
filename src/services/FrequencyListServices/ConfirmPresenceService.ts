import prismaClient from "../../prisma";

export class ConfirmPresenceService {
  async execute(classId: string, lessonId: string, userId: string) {
    try {
      const res = await prismaClient.frequencyList.create({
        data: { classId, lessonId, userId },
      });

      if (!res) {
        throw new Error("Erro ao confirmar presença.");
      }
      return res;
    } catch (err) {
      throw new Error(
        `Erro ao adicionar aluno à turma: ${(err as Error).message}`
      );
    }
  }
}
