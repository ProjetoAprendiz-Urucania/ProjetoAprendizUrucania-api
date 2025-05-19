import prismaClient from "../../prisma";
import { IUpdateClassCard } from "../../interfaces/IUpdateClassCard";

export class UpdateClassService {
  async execute(id: string, { name, teacherInfo, coverImage }: IUpdateClassCard) {
    try {
      const classData = await prismaClient.class.findUnique({
        where: { id },
      });

      if (!classData) {
        throw new Error("Class not found.");
      }

      const updatedData: Partial<IUpdateClassCard> = {};
      if (name) updatedData.name = name;
      if (teacherInfo) updatedData.teachers = teacherInfo;
      if (coverImage) updatedData.coverImage = coverImage; 

      const updatedClass = await prismaClient.class.update({
        where: { id },
        data: updatedData,
      });

      return updatedClass;
    } catch (err) {
      throw new Error(`Class update error: ${(err as Error).message}`);
    }
  }
}
