import prisma from "../../prisma";

export class GetUserClassService {
  async execute(userId?: string) {
    try {
      console.log(userId);
      if (userId) {
        const classes = await prisma.userClass.findMany({
          where: {
            userId: userId,
            class: { 
              id: { not: undefined },
            },
          },
          include: {
            class: true,
          },
        });
        
        return { classes: classes.map((c) => c.class) };
      }

      throw new Error("É necessário fornecer um userId ou classId.");
    } catch (err) {
      throw new Error(`Erro ao executar serviço: ${(err as Error).message}`);
    }
  }
}
