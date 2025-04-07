import prismaClient from "../../prisma";

export class DeleteTheoryMaterialService {
  async execute(id: string) {
    try {
      if (!id) {
        throw new Error("Invalid ID format.");
      }

      const theoryMaterialData = await prismaClient.theoryMaterial.findUnique({
        where: { id },
      });

      if (!theoryMaterialData) {
        throw new Error("Theory Material not found.");
      }

      return await prismaClient.theoryMaterial.delete({ where: { id } });
    } catch (err) {
      throw new Error(`Error deleting theoryMaterial: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
