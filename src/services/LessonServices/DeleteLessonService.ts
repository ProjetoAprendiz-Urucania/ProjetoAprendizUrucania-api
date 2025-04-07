import prismaClient from "../../prisma";
import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

async function clearFolder(bucketName: string, folderPath: string) {
  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: folderPath,
    };

    const listedObjects = await s3.send(new ListObjectsV2Command(listParams));

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log("No files to delete in the folder.");
      return;
    }

    const deleteParams = {
      Bucket: bucketName,
      Delete: {
        Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
      },
    };

    await s3.send(new DeleteObjectsCommand(deleteParams));
    console.log("Folder cleared successfully.");
  } catch (error) {
    console.error("Error clearing folder:", error);
  }
}
export class DeleteLessonService {
  async execute(lessonId: string) {
    const bucketName = "pa-upload-pdfs";
    const folderPath = `lessonsPhotos/${lessonId}/`;
    try {
    
      const lessonData = await prismaClient.lesson.findUnique({
        where: { id: lessonId },
      });

      if (!lessonData) {
        throw new Error("Lesson not found.");
      }
      console.log("aqui");
      await prismaClient.lesson.delete({ where: { id: lessonId } });
      console.log("aqui2");

      await clearFolder(bucketName, folderPath);

      return { message: "Lesson deleted successfully." };
    } catch (err) {
      console.error(err);
      throw new Error(
        `Error deleting lesson: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}
