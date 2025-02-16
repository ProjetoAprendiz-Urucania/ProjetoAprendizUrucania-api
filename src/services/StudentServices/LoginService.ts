import prismaClient from "../../prisma";
import { IStudent } from "../../interfaces/IStudent";
import bcrypt from "bcrypt";

export class LoginService {
  async execute({ email, password }: Partial<IStudent>) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const student = await prismaClient.student.findUnique({
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

      return studentWithoutPassword;
    } catch (err) {
        throw new Error(
            `Login error: ${err instanceof Error ? err.message : "Unexpected error"}`
          );
    }
  }
}
