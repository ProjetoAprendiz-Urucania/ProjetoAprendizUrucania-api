import prismaClient from "../../prisma";
import { ICreateStudentCard } from "../../interfaces/ICreateStudentCard";

export class CreateStudentService {
  async execute({ name, email, password, church }: ICreateStudentCard) {
    try {
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        throw new Error("Fill in all required fields.");
      }

      const newStudent = await prismaClient.student.create({
        data: {
          name,
          email,
          password,
          status: true,
          ...(church ? { church } : {}),
        },
      });

      return newStudent;
    } catch (err) {
      throw new Error(
        `Error creating student: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }
}
