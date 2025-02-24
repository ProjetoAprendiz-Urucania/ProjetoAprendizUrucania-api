import prismaClient from "../../prisma";
import { IStudent } from "../../interfaces/IStudent";
import bcrypt from "bcrypt";
import { app } from "../../server/server";

export class LoginService {
  async execute({ email, password }: Partial<IStudent>) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const student = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!student) {
        throw new Error("Invalid email or password.");
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
      }

      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }

      const { password: _, ...studentWithoutPassword } = student;

      const token = app.jwt.sign(
        { id: studentWithoutPassword.id, email: studentWithoutPassword.email, role: studentWithoutPassword.role },
        { expiresIn: "1h" } 
      );
      
      return { studentWithoutPassword:studentWithoutPassword, token:token };
    } catch (err) {
        throw new Error(
            `Login error: ${err instanceof Error ? err.message : "Unexpected error"}`
          );
    }
  }
}
