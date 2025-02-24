import prismaClient from "../../prisma";

const ERROR_MESSAGES = {
  THEORY_MATERIAL_NOT_FOUND: "Theory Material not found.",
  THEORY_MATERIALS_NOT_FOUND: "No theory materials found.",
  INVALID_THEORY_MATERIAL_ID: "Invalid theory material ID.",
  INTERNAL_ERROR: "An error occurred while fetching theory material data.",
};

export class GetTheoryMaterialService {
  async execute(lessonId?: string) {
    try {
      if (lessonId && typeof lessonId !== "string") {
        throw new Error(ERROR_MESSAGES.INVALID_THEORY_MATERIAL_ID);
      }

      if (lessonId) {
        const theoryMaterialData = await prismaClient.theoryMaterial.findMany({
          where: {
            lessonId: lessonId,
          },
        });

        if (!theoryMaterialData) {
          throw new Error(ERROR_MESSAGES.THEORY_MATERIAL_NOT_FOUND);
        }

        return theoryMaterialData;
      }

      const theoryMaterials = await prismaClient.theoryMaterial.findMany();

      if (theoryMaterials.length === 0) {
        throw new Error(ERROR_MESSAGES.THEORY_MATERIAL_NOT_FOUND);
      }

      return theoryMaterials;
    } catch (err) {
      throw new Error(
        `${ERROR_MESSAGES.INTERNAL_ERROR} ${(err as Error).message}`
      );
    }
  }
}