import { MultipartFile } from "@fastify/multipart";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { Readable } from "stream";

const s3 = new S3Client({
  region: "sa-east-1",
  credentials: fromIni({ profile: "default" }),
});

export class UploadProfilePhotoService {
  async execute(studentId: string, parts: AsyncIterable<MultipartFile>) {
    const bucketName = "pa-upload-pdfs";
    const uploadedFiles: { filename: string; fileUrl: string; status: string; fileType: string }[] = [];

    try {
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

        const fileKey = `profilePhotos/${studentId}/${part.filename}`;
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

      if (uploadedFiles.every(file => file.status === "failed")) {
        throw new Error("All file uploads failed");
      }

      return {
        message: "Upload process completed",
        uploadedFiles,
      };
    } catch (err) {
      throw new Error(`Profile photo upload error: ${(err as Error).message}`);
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
