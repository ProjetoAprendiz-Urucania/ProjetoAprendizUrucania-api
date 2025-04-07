import prismaClient from "../../prisma";
import { ICreateClassCard } from "../../interfaces/ICreateClassCard";

export class CreateClassService {
  async execute({ name, teachers }: ICreateClassCard) {
    if (!name?.trim() || !teachers?.trim()) {
      throw new Error("Fill in all fields.");
    }

    const existingClass = await prismaClient.class.findFirst({
      where: {
        name: name.trim(),
      },
      select: {
        name: true, 
      }
    });

    if (existingClass) {
      throw new Error("The class name already exists.");
    }

    const newClass = await prismaClient.class.create({
      data: {
        name,
        teachers,
        coverImage: "", 
        created_at: new Date(), 
        updated_at: new Date(),
      },
    });

    return newClass;
  }
}
