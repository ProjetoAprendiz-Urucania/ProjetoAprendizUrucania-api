import prismaClient from "../../prisma";
import { ICreateTheoryMaterialCard } from "../../interfaces/ICreateTheoryMaterialCard";

export class CreateTheoryMaterialService {
  async execute(lessonId: string,data: ICreateTheoryMaterialCard) {
    try {
      const {name,fileUrl,fileType} = data;

      if (!name?.trim() || !fileUrl?.trim() || !fileType?.trim()) {
        throw new Error("Fill in all required fields.");
      }

      if (!lessonId?.trim()) {
        throw new Error("Lesson ID is required.");
      }

      const newMaterial = await prismaClient.theoryMaterial.create({
        data: {
          name,
          fileUrl,
          fileType,
          lessonId
        },
      });

      return newMaterial;
    } catch (err) {
      throw new Error(
        `Error creating TheoryMaterial: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }
}
