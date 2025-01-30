import prismaClient from "../../prisma";

const ERROR_MESSAGES = {
  THEORY_MATERIAL_NOT_FOUND: "Theory Material not found.",
  THEORY_MATERIALS_NOT_FOUND: "No theory materials found.",
  INVALID_THEORY_MATERIAL_ID: "Invalid theory material ID.",
  INTERNAL_ERROR: "An error occurred while fetching theory material data.",
};

export class GetTheoryMaterialService {
  async execute(theoryMaterialId?: string) {
    try {
      if (theoryMaterialId && typeof theoryMaterialId !== "string") {
        throw new Error(ERROR_MESSAGES.INVALID_THEORY_MATERIAL_ID);
      }

      if (theoryMaterialId) {
        const theoryMaterialData = await prismaClient.theoryMaterial.findUnique({
          where: {
            id: theoryMaterialId,
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