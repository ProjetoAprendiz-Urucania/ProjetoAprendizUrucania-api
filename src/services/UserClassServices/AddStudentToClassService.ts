import prismaClient from "../../prisma";

export class AddStudentToClassService {
  async execute(classId: string, userId: string) {
    try {
      const student = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!student) {
        throw new Error("Aluno não encontrado.");
      }

      const classroom = await prismaClient.class.findUnique({
        where: { id: classId },
      });

      if (!classroom) {
        throw new Error("Turma não encontrada.");
      }

      const alreadyEnrolled = await prismaClient.userClass.findUnique({
        where: {
          userId_classId: { userId, classId },
        },
      });

      if (alreadyEnrolled) {
        throw new Error("O aluno já está nesta turma.");
      }

      const userClass = await prismaClient.userClass.create({
        data: { userId, classId },
      });

      return {
        message: "Aluno adicionado com sucesso à turma.",
        data: userClass,
      };
    } catch (err) {
      throw new Error(`Erro ao adicionar aluno à turma: ${(err as Error).message}`);
    }
  }
}
