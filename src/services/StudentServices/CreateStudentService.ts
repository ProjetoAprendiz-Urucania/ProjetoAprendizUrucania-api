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

      if (existingStudent) {
        console.error("Erro: Email já cadastrado");
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
      console.error("Erro ao criar estudante:", err);
      throw err;
    }
  }
}
