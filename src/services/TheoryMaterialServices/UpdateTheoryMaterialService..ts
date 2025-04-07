import prismaClient from "../../prisma";
import { ICreateTheoryMaterialCard } from "../../interfaces/ICreateTheoryMaterialCard";

export class UpdateTheoryMaterialService {
  async execute(id: string, {name, fileUrl, fileType}:  ICreateTheoryMaterialCard) {
    try {
      const theoryMaterialData = await prismaClient.theoryMaterial.findUnique({
        where: { id },
      });

      if (!theoryMaterialData) {
        throw new Error("TheoryMaterial not found.");
      }

      const updatedData: Partial<ICreateTheoryMaterialCard> = {};
      if (name) updatedData.name = name;
      if (fileUrl) updatedData.fileUrl = fileUrl;
      if (fileType) updatedData.fileType = fileType;

      const updatedTheoryMaterial = await prismaClient.theoryMaterial.update({
        where: { id },
        data: updatedData,
      });

      return updatedTheoryMaterial;
    } catch (err) {
      throw new Error(`Theory Material update error: ${(err as Error).message}`);
    }
  }
}