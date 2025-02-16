import prismaClient from "../../prisma";
import { ICreateStudentCard } from "../../interfaces/ICreateStudentCard";
import bcrypt from "bcrypt";

export class CreateStudentService {
  async execute({ name, email, password, church }: ICreateStudentCard) {
    try {
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        throw new Error("Fill in all required fields.");
      }

      const existingStudent = await prismaClient.student.findUnique({
        where: { email },
      });

      if(existingStudent) {
        throw new Error("Email already registered.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newStudent = await prismaClient.student.create({
        data: {
          name,
          email,
          password: hashedPassword,
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
