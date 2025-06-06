import { MultipartFile } from "@fastify/multipart";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS_REGION:", process.env.AWS_REGION);


async function clearFolder(bucketName: string, folderPath: string) {
  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: folderPath,
    };

    const listedObjects = await s3.send(new ListObjectsV2Command(listParams));

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      return;
    }

    const deleteParams = {
      Bucket: bucketName,
      Delete: {
        Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
      },
    };

    await s3.send(new DeleteObjectsCommand(deleteParams));
    console.log(`Pasta ${folderPath} limpa antes do upload.`);
  } catch (error) {
    console.error("Erro ao limpar a pasta:", error);
  }
}

export class UploadLessonPhotoService {
  async execute(lessonId: string, parts: AsyncIterable<MultipartFile>) {
    const bucketName = process.env.BUCKET_NAME || "";
    const folderPath = `lessonsPhotos/${lessonId}/`;
    const uploadedFiles: {
      filename: string;
      fileUrl: string;
      status: string;
      fileType: string;
    }[] = [];

    try {
      await clearFolder(bucketName, folderPath);

      for await (const part of parts) {
        if (!part.mimetype.startsWith("image/")) {
          uploadedFiles.push({
            filename: part.filename,
            fileUrl: "",
            status: "failed",
            fileType: part.mimetype,
          });
          continue;
        }

        const fileKey = `lessonsPhotos/${lessonId}/${part.filename}`;
        const fileBuffer = await streamToBuffer(part.file);
        const fileUrl = `https://${bucketName}.s3.sa-east-1.amazonaws.com/${fileKey}`;

        const uploadParams = {
          Bucket: bucketName,
          Key: fileKey,
          Body: fileBuffer,
          ContentType: part.mimetype,
          ContentLength: fileBuffer.length,
        };

        try {
          console.log("Uploading:", uploadParams);
          await s3.send(new PutObjectCommand(uploadParams));
          uploadedFiles.push({
            filename: part.filename,
            fileUrl: fileUrl,
            status: "success",
            fileType: part.mimetype,
          });
        } catch (error) {
          console.error(`Error uploading ${part.filename}:`, error);
          uploadedFiles.push({
            filename: part.filename,
            fileUrl: "",
            status: "failed",
            fileType: part.mimetype,
          });
        }
      }

      if (uploadedFiles.every((file) => file.status === "failed")) {
        throw new Error("All file uploads failed");
      }

      return {
        message: "Upload process completed",
        uploadedFiles,
      };
    } catch (err) {
      throw new Error(`Lesson photo upload error: ${(err as Error).message}`);
    }
  }
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
