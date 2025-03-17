import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import prismaClient from "../../prisma";

const s3 = new S3Client({
  region: "sa-east-1",
  credentials: fromIni({ profile: "default" }),
});

async function clearFolder(bucketName: string, folderPath: string) {
  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: folderPath,
    };

    const listedObjects = await s3.send(new ListObjectsV2Command(listParams));

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log(`A pasta ${folderPath} já está vazia.`);
      return;
    }

    const objectsToDelete = listedObjects.Contents.map(({ Key }) => 
      Key ? { Key } : null
    ).filter(Boolean) as { Key: string }[]; 

    if (objectsToDelete.length === 0) {
      console.log(`Nenhum objeto válido encontrado em ${folderPath}.`);
      return;
    }

    await s3.send(new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: { Objects: objectsToDelete },
    }));

    console.log(`Pasta ${folderPath} limpa antes do upload.`);
  } catch (error) {
    console.error(`Erro ao limpar a pasta ${folderPath}:`, error);
    throw error; 
  }
}

export class DeleteProfilePhotoService {
  async execute(studentId: string) {
    const bucketName = "pa-upload-pdfs";
    const folderPath = `profilePhotos/${studentId}/`;

    try {
      await clearFolder(bucketName, folderPath);

      const studentData = await prismaClient.user.update({
        where: { id: studentId },
        data: { profilePicture: null },
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
        },
      });

      console.log(`Foto de perfil do aluno ${studentId} deletada com sucesso.`);

      return { studentData,message: "Delete process completed" };
    } catch (error) {
      throw new Error(`Profile photo delete error: ${(error as Error).message}`);
    }
  }
}
