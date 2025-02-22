import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { CreateTheoryMaterialController } from "../controllers/TheoryMaterial/CreateTheoryMaterialController";
import { DeleteTheoryMaterialController } from "../controllers/TheoryMaterial/DeleteTheoryMaterialController";
import { GetTheoryMaterialController } from "../controllers/TheoryMaterial/GetTheoryMaterialController";
import { UpdateTheoryMaterialController } from "../controllers/TheoryMaterial/UpdateTheoryMaterialController";

export async function theoryMaterialRoutes(fastify: FastifyInstance) {
    fastify.post(
        "/classes/:classId/:lessonId/theoryMaterials",
        async (req: FastifyRequest, res: FastifyReply) => {
          return new CreateTheoryMaterialController().handle(req, res);
        }
      );
    
      fastify.delete(
        "/classes/:classId/:lessonId/theoryMaterials/:theoryMaterialId",
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
        "/classes/:classId/:lessonId/theoryMaterials",
        async (req: FastifyRequest, res: FastifyReply) => {
          return new GetTheoryMaterialController().handle(req, res);
        }
      );
    
      fastify.get(
        "/classes/:classId/:lessonId/theoryMaterials/:theoryMaterialId",
        async (req: FastifyRequest, res: FastifyReply) => {
          const { theoryMaterialId } = req.params as { theoryMaterialId: string };
    
          const theoryMaterialController = new GetTheoryMaterialController();
          const data = await theoryMaterialController.handle(
            { ...req, body: { theoryMaterialId } },
            res
          );
    
          res.send(data);
        }
      );
    
      fastify.put(
        "/classes/:classId/:lessonId/theoryMaterials/:theoryMaterialId",
        async (req: FastifyRequest, res: FastifyReply) => {
          return new UpdateTheoryMaterialController().handle(req, res);
        }
      );
}