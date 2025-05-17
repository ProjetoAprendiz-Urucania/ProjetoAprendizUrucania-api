import prismaClient from "../../prisma";

export class GetClassService {
  async execute(id?: string) {
    try {
      if (!id) {
        const classes = await prismaClient.class.findMany({
          include: {
            lessons: {
              include: {
                TheoryMaterial: true,
              },
            },
          },
        });

        return classes;
      }

      const classData = await prismaClient.class.findUnique({
        where: {
          id,
        },
          include: {
            lessons: {
              include: {
                TheoryMaterial: true,
              },
            },
          },
      });

      return classData;
    } catch (err) {
      throw new Error(`Class search error: ${(err as Error).message}`);
    }
  }
}
