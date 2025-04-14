import { ObjectId } from "mongodb";
import prismaClient from "../../prisma";
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },});

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

export class DeleteClassService {
  async execute(classId: string) {
    const bucketName = process.env.BUCKET_NAME || "";
    const folderPath = `classesPhotos/${classId}/`;

    try {
      if (!ObjectId.isValid(classId)) {
        throw new Error("Invalid ID format.");
      }

      const classData = await prismaClient.class.findUnique({
        where: { id: classId },
      });

      if (!classData) {
        throw new Error("Class not found.");
      }

      await prismaClient.class.delete({ where: { id: classId } });

      await clearFolder(bucketName, folderPath);

      return { message: "Class deleted successfully." };
    } catch (err) {
      console.error("Error deleting class:", err);
      throw new Error(
        `Error deleting class: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}
