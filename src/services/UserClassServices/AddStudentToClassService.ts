import prismaClient from "../../prisma";

export class AddStudentToClassService {
  async execute(classId: string, userId: string) {
    try {
      
      const studentData = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!studentData) {
        throw new Error("Aluno não encontrado.");
      }

      const classData = await prismaClient.class.findFirst({
        where: { id: classId },
      });

      if (!classData) {
        throw new Error("Turma não encontrada.");
      }

      const existingUserClass = await prismaClient.userClass.findFirst({
        where: { userId, classId },
      });

      if (existingUserClass) {
        throw new Error("O aluno já está nesta turma.");
      }

      const createStudentClass = await prismaClient.userClass.create({
        data: { userId, classId },
      });

      return createStudentClass;
    } catch (err) {
      throw new Error(`Erro ao adicionar aluno à turma: ${(err as Error).message}`);
    }
  }
}
