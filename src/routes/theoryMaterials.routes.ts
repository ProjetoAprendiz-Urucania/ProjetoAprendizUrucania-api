import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { UploadTheoryMaterialController } from "../controllers/TheoryMaterial/UploadTheoryMaterialController";
import { DeleteTheoryMaterialController } from "../controllers/TheoryMaterial/DeleteTheoryMaterialController";
import { GetTheoryMaterialController } from "../controllers/TheoryMaterial/GetTheoryMaterialController";
import { UpdateTheoryMaterialController } from "../controllers/TheoryMaterial/UpdateTheoryMaterialController";

export async function theoryMaterialRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/classes/:classId/:lessonId/theoryMaterials",
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UploadTheoryMaterialController().handle(req, res);
    }
  );

  fastify.delete(
    "/classes/:classId/:lessonId/theoryMaterials/:theoryMaterialId",
    { preHandler: [fastify.authenticate, fastify.isAdmin] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const { theoryMaterialId } = req.params as { theoryMaterialId: string };

      const theoryMaterialController = new DeleteTheoryMaterialController();
      return theoryMaterialController.handle(
        { ...req, body: { theoryMaterialId } },
        res
      );
    }
  );

  fastify.get(
    "/classes/:classId/theoryMaterials",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new GetTheoryMaterialController().handle(req, res);
    }
  );
  
  fastify.get(
    "/classes/:classId/:lessonId/theoryMaterials",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new GetTheoryMaterialController().handle(req, res);
    }
  );
  
  fastify.get(
    "/classes/:classId/:lessonId/theoryMaterials/:theoryMaterialId",
    { preHandler: [fastify.authenticate] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new GetTheoryMaterialController().handle(req, res);
    }
  );  

  fastify.put(
    "/classes/:classId/:lessonId/theoryMaterials/:theoryMaterialId",
    { preHandler: [fastify.authenticate, fastify.isAdmin] },
    async (req: FastifyRequest, res: FastifyReply) => {
      return new UpdateTheoryMaterialController().handle(req, res);
    }
  );
}
