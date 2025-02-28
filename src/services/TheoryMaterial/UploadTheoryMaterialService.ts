import { MultipartFile } from "@fastify/multipart";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "sa-east-1",
  credentials: new AWS.SharedIniFileCredentials({ profile: "default" }),
});

export class UploadTheoryMaterialService {
  async execute(lessonId: string, parts: AsyncIterable<MultipartFile>) {
    const bucketName = "pa-upload-pdfs";
    const uploadedFiles: { filename: string; fileUrl: string; status: string,fileType: string }[] = [];

    try {
      for await (const part of parts) {
        const fileKey = `theoryMaterials/${lessonId}/${part.filename}`;
        const uploadParams = {
          Bucket: bucketName,
          Key: fileKey,
          Body: part.file,
          ContentType: part.mimetype,
        };

        try {
          console.log("Uploading:", uploadParams);
          await s3.upload(uploadParams).promise();
          uploadedFiles.push({ filename: part.filename, fileUrl: fileKey, status: "success",fileType: part.mimetype});
        } catch (error) {
          console.error(`Error uploading ${part.filename}:`, error);
          uploadedFiles.push({ filename: part.filename, fileUrl: fileKey, status: "failed",fileType: part.mimetype });
        }
      }

      return {
        message: "Upload process completed",
        uploadedFiles,
      };
    } catch (err) {
      throw new Error(
        `Theory Material upload error: ${(err as Error).message}`
      );
    }
  }
}

