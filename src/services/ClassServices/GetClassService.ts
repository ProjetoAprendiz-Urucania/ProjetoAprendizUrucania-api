import prismaClient from "../../prisma";

export class GetClassService {
  async execute(id?: string) {
    try {
      if (!id) {
        const classes = await prismaClient.class.findMany({
          select: {
            id: true,
            name: true,
            teachers: true,
            coverImage: true,
          },
        });
        
        return classes;
      }

      const classData = await prismaClient.class.findUnique({
        where: {
          id,
        },
      });

      return classData;
    } catch (err) {
      throw new Error(`Class search error: ${(err as Error).message}`);
    }
  }
}
