import prismaClient from "../../prisma";
import { IStudent } from "../../interfaces/IStudent";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/AppError";
import { app } from "../../server/server";

export class LoginService {
  async execute({ email, password }: Partial<IStudent>) {
    try {
      if (!email || !password) {
        throw new AppError("Preencha todos os campos obrigatórios", 400);
      }

      let student = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!student) {
        throw new AppError("E-mail ou senha inválidos", 400);
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);
      
      if (!isPasswordValid) {
        console.log(`\n\n\n${student.password}  ${password}\n\n\n`);
        throw new Error("Invalid email or password.");
      }
      if (!isPasswordValid) {
        throw new AppError("E-mail ou senha inválidos", 400);
      }

      const { password: _, ...studentWithoutPassword } = student;

      const token = app.jwt.sign(
        {
          id: studentWithoutPassword.id,
          email: studentWithoutPassword.email,
          role: studentWithoutPassword.role,
        },
        { expiresIn: "1h" }
      );

      return { studentWithoutPassword: studentWithoutPassword, token: token };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Unexpected error");
    }
  }
}
