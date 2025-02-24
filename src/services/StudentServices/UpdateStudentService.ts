import prismaClient from "../../prisma";
import { ICreateStudent } from "../../interfaces/ICreateStudent";

export class UpdateStudentService {
  async execute(id: string, {name, email, password, church, profilePicture}:  Partial<ICreateStudent>) {
    try {
      const studentData = await prismaClient.student.findUnique({
        where: { id },
      });

      if (!studentData) {
        throw new Error("Student not found.");
      }

      const updatedData: Partial<ICreateStudent> = {};
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (password) updatedData.password = password;
      if(church) updatedData.church = church;
      if(profilePicture) updatedData.profilePicture = profilePicture;

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
