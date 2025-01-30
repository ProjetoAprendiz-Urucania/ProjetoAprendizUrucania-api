import prismaClient from "../../prisma";
import { ICreateStudentCard } from "../../interfaces/ICreateStudentCard";

export class UpdateStudentService {
  async execute(id: string, {name, email, password, church  }:  Partial<ICreateStudentCard>) {
    try {
      const studentData = await prismaClient.student.findUnique({
        where: { id },
      });

      if (!studentData) {
        throw new Error("Student not found.");
      }

      const updatedData: Partial<ICreateStudentCard> = {};
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (password) updatedData.password = password;
      if(church) updatedData.church = church;

      const updatedStudent = await prismaClient.student.update({
        where: { id },
        data: updatedData,
      });

      return updatedStudent;
    } catch (err) {
      throw new Error(`Student update error: ${(err as Error).message}`);
    }
  }
}
