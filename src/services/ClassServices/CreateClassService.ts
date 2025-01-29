import prismaClient from "../../prisma";
import { ICreateClassDTO } from "../../interfaces/ICreateClassDTO";

export class CreateClassService {
  async execute({ name, teachers, coverImage }: ICreateClassDTO) {
    try {
      if (!name?.trim() || !teachers?.trim() || !coverImage?.trim()) {
        throw new Error("Fill in all fields.");
      }

      const newClass = await prismaClient.class.create({
        data: {
          name,
          teachers,
          coverImage,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      return newClass;
    } catch (err) {
      throw new Error(`Error creating class: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
