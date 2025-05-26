import prisma from "../../prisma";
import { ObjectId } from "mongodb";

export class GetClassStudentsService {
  async execute(classId?: string) {
    try {
      if (!classId) {
        throw new Error("É necessário fornecer um classId.");
      }

      if (!ObjectId.isValid(classId)) {
        throw new Error("classId inválido.");
      }

      const students = await prisma.userClass.findMany({
        where: { classId },
        include: { user: true },
      });

      const users = students.map(({ user }) => user);
      console.log("--------------------Estudantes encontrados:", users);
      return { students: users };
    } catch (err) {
      throw new Error(`Erro ao executar serviço: ${(err as Error).message}`);
    }
  }
}
