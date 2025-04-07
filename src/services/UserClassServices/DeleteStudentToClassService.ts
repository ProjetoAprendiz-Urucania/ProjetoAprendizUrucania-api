import prismaClient from "../../prisma";

export class DeleteStudentToClassService {
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

      const enrollment = await prismaClient.userClass.findUnique({
        where: {
          userId_classId: { userId, classId },
        },
      });

      if (!enrollment) {
        throw new Error("O aluno não está matriculado nesta turma.");
      }

      await prismaClient.userClass.delete({
        where: {
          userId_classId: { userId, classId },
        },
      });

      return {
        message: "Aluno removido com sucesso da turma.",
      };
    } catch (err) {
      throw new Error(
        `Erro ao remover aluno da turma: ${(err as Error).message}`
      );
    }
  }
}
