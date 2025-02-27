// import { FastifyRequest, FastifyReply } from "fastify";
// // import { ICreateTheoryMaterialCard } from "../../interfaces/ICreateTheoryMaterialCard";
// // import { CreateTheoryMaterialService } from "../../services/TheoryMaterial/CreateTheoryMaterialService";
// import fs from 'fs';
// import path from 'path';
// import util from 'util';
// import { pipeline } from 'stream';

// const pump = util.promisify(pipeline);

// export class UploadTheoryMaterialController {
//   async handle(req: FastifyRequest, res: FastifyReply) {
//     // const { classId, lessonId } = req.params as { classId: string, lessonId: string };
//     const parts = req.files();

//     const uploadDir = path.join(__dirname, `../../../docs`);
    
//     fs.mkdirSync(uploadDir, { recursive: true });

//     for await (const part of parts) {
//       const filePath = path.join(uploadDir, part.filename);
      
//       await pump(part.file, fs.createWriteStream(filePath));
//     }

//     return { message: 'files uploaded' };
//   }
// }

import { FastifyRequest, FastifyReply } from "fastify";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: 'sa-east-1',
  credentials: new AWS.SharedIniFileCredentials({ profile: 'default' })
});

export class UploadTheoryMaterialController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const {lessonId} = req.params as {classId: string,lessonId: string}
    const parts = req.files();
    const bucketName = 'pa-upload-pdfs'; 

    for await (const part of parts) {
      const uploadParams = {
        Bucket: bucketName,
        Key: `theoryMaterials/${lessonId}/${part.filename}`,
        Body: part.file,
        ContentType: part.mimetype, 
      };

      try {
        console.log(uploadParams);

        await s3.upload(uploadParams).promise();
      } catch (error) {
        console.error('Erro ao fazer upload no S3:', error);
        return res.status(500).send({ error: 'Erro ao fazer upload no S3' });
      }
    }

    return { message: 'files uploaded to S3' };
  }
}

