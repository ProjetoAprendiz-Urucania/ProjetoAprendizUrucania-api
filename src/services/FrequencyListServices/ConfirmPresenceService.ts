import prismaClient from "../../prisma";

export class ConfirmPresenceService {
  async execute(classId: string, lessonId: string, userId: string) {
    try {
      const alreadyExists = await prismaClient.frequencyList.findFirst({
        where: { classId, lessonId, userId },
      });

      if (alreadyExists) {
        return {
          success: false,
          message: "Presença já confirmada.",
          data: alreadyExists,
        };
      }

      const res = await prismaClient.frequencyList.create({
        data: { classId, lessonId, userId },
      });

      return {
        success: true,
        message: "Presença confirmada com sucesso.",
        data: res,
      };
    } catch (err) {
      throw new Error(`Erro ao confirmar presença: ${(err as Error).message}`);
    }
  }
}
