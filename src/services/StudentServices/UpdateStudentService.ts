import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import { ICreateStudent } from "../../interfaces/ICreateStudent";

export class UpdateStudentService {
  async execute(id: string, {name, email, password, church, profilePicture}:  Partial<ICreateStudent>) {
    try {
      const studentData = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!studentData) {
        throw new Error("Student not found.");
      }

      const updatedData: Partial<ICreateStudent> = {};
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (password) updatedData.password = await bcrypt.hash(password,10);
      if (church) updatedData.church = church;
      if (profilePicture) updatedData.profilePicture = profilePicture;

      const updatedStudent = await prismaClient.user.update({
        where: { id },
        data: updatedData,
      });

      return updatedStudent;
    } catch (err) {
      throw new Error(`Student update error: ${(err as Error).message}`);
    }
  }
}
