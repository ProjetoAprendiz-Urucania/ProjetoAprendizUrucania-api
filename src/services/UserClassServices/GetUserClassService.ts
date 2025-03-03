import prisma from "../../prisma";

export class GetUserClassService {
  async execute(classId?: string, userId?: string) {
    try {
      if (classId) {
        const classes = await prisma.userClass.findMany({
          where: { userId: userId },
          include: { class: true },
        });
        return { classes: classes.map((c) => c.class) };
      }

      if (userId) {
        const students = await prisma.userClass.findMany({
          where: { classId: classId },
          include: { user: true },
        });

        return { students: students.map((s) => s.user) };
      }

      throw new Error("É necessário fornecer um userId ou classId.");
    } catch (err) {
      throw new Error(`Erro ao executar serviço: ${(err as Error).message}`);
    }
  }
}
