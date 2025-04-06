import prisma from "../../prisma";
import { ObjectId } from "mongodb";

export class GetUserClassService {
  async execute(userId?: string) {
    try {
      if (userId) {
        if (!ObjectId.isValid(userId)) {
          throw new Error("ID de usuário inválido.");
        }

        const classes = await prisma.userClass.findMany({
          where: {
            userId: new ObjectId(userId) as any, 
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
