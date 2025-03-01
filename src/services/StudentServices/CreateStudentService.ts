import prismaClient from "../../prisma";
import { ICreateStudent } from "../../interfaces/ICreateStudent";
import bcrypt from "bcrypt";
import { app } from "../../server/server";

export class CreateStudentService {
  async execute({ name, email, password, church }: ICreateStudent) {
    try {
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        throw new Error("Fill in all required fields.");
      }
      const existingStudent = await prismaClient.user.findUnique({
        where: { email },
      });

      if (existingStudent) {
        console.error("Erro: Email já cadastrado");
        throw new Error("Email already registered.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStudent = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          status: true,
          role: "student",
          ...(church ? { church } : {}),
        },
      });

      const token = app.jwt.sign(
        { id: newStudent.id, email: newStudent.email, role: newStudent.role },
        { expiresIn: "1h" } 
      );
      
      newStudent.password = ""
      return { studentWithoutPassword:newStudent, token:token };
    } catch (err) {
      console.error("Erro ao criar estudante:", err);
      throw err;
    }
  }
}
