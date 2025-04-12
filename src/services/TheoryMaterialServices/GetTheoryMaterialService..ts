import prismaClient from "../../prisma";

const ERROR_MESSAGES = {
  THEORY_MATERIAL_NOT_FOUND: "Theory Material not found.",
  THEORY_MATERIALS_NOT_FOUND: "No theory materials found.",
  INVALID_LESSON_ID: "Invalid or missing Lesson ID.",
  INTERNAL_ERROR: "An error occurred while fetching theory material data.",
};

export class GetTheoryMaterialService {
  async execute(lessonId?: string, theoryMaterialId?: string) {
    try {
      if (theoryMaterialId) {
        const theoryMaterialData = await prismaClient.theoryMaterial.findUnique(
          {
            where: { id: theoryMaterialId },
          }
        );

        if (!theoryMaterialData) {
          throw new Error(ERROR_MESSAGES.THEORY_MATERIAL_NOT_FOUND);
        }

        return theoryMaterialData;
      }
      if (lessonId) {
        const theoryMaterials = await prismaClient.theoryMaterial.findMany({
          where: { lessonId: lessonId },
        });

        console.log("theoryMaterials", theoryMaterials);

        if (theoryMaterials.length === 0) {
          throw new Error(ERROR_MESSAGES.THEORY_MATERIALS_NOT_FOUND);
        }

        return theoryMaterials;
      }

      const theoryMaterials = await prismaClient.theoryMaterial.findMany();

      return theoryMaterials;
    } catch (err) {
      console.error("Error in GetTheoryMaterialService:", err);
      throw new Error(`${ERROR_MESSAGES.INTERNAL_ERROR} ${err}`);
    }
  }
}
