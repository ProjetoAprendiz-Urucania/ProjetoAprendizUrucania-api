import prismaClient from "../../prisma";
import { ICreateClassCard } from "../../interfaces/ICreateClassCard";

export class UpdateClassService {
  async execute(id: string, { name, teachers, coverImage }: ICreateClassCard) {
    try {
      const classData = await prismaClient.class.findUnique({
        where: { id },
      });

      if (!classData) {
        throw new Error("Class not found.");
      }

      const updatedData: Partial<ICreateClassCard> = {};
      if (name) updatedData.name = name;
      if (teachers) updatedData.teachers = teachers;
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
