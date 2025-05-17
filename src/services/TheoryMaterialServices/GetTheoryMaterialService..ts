import prismaClient from "../../prisma";

const ERROR_MESSAGES = {
  THEORY_MATERIAL_NOT_FOUND: "Theory Material not found.",
  THEORY_MATERIALS_NOT_FOUND: "No theory materials found.",
  INTERNAL_ERROR: "An error occurred while fetching theory material data.",
};

export class GetTheoryMaterialService {
  async execute(classId: string, lessonId?: string, theoryMaterialId?: string) {
    try {
      if (theoryMaterialId && lessonId) {
        const theoryMaterial = await prismaClient.theoryMaterial.findFirst({
          where: {
            id: theoryMaterialId,
            lessonId,
            lesson: {
              classId
            }
          },
        });

        if (!theoryMaterial) {
          throw new Error(ERROR_MESSAGES.THEORY_MATERIAL_NOT_FOUND);
        }

        return theoryMaterial;
      }

      if (lessonId) {
        const theoryMaterials = await prismaClient.theoryMaterial.findMany({
          where: {
            lessonId,
            lesson: {
              classId
            }
          },
        });

        if (theoryMaterials.length === 0) {
          throw new Error(ERROR_MESSAGES.THEORY_MATERIALS_NOT_FOUND);
        }

        return theoryMaterials;
      }

      const theoryMaterials = await prismaClient.theoryMaterial.findMany({
        where: {
          lesson: {
            classId,
          },
        },
      });

      return theoryMaterials;
    } catch (err: any) {
      console.error("Error in GetTheoryMaterialService:", err);
      throw new Error(`${ERROR_MESSAGES.INTERNAL_ERROR} ${err.message}`);
    }
  }
}
