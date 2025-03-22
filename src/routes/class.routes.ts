import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateClassController } from "../controllers/ClassController/CreateClassController";
import { DeleteClassController } from "../controllers/ClassController/DeleteClassController";
import { GetClassController } from "../controllers/ClassController/GetClassController";
import { UpdateClassController } from "../controllers/ClassController/UpdateClassController";
import { UploadClassPhotoController } from "../controllers/ClassController/UploadClassPhotoController";

export async function classRoutes(fastify: FastifyInstance) {
 fastify.post("/classes", 
    async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateClassController().handle(req, res);
  });

  fastify.post("/classes/:classId/uploadPhoto", 
    async (req: FastifyRequest, res: FastifyReply) => {
    return new UploadClassPhotoController().handle(req, res);
  });

  fastify.delete(
    "/classes/:id", { preHandler: [fastify.authenticate,fastify.isAdmin] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const { id } = req.params as { id: string };

      const classController = new DeleteClassController();
      return classController.handle({ ...req, body: { id } }, res);
    }
  );

  fastify.get("/classes", { preHandler: [fastify.authenticate] }, async (req: FastifyRequest, res: FastifyReply) => {
    return new GetClassController().handle(req, res);
  });

  fastify.get("/classes/:id", { preHandler: [fastify.authenticate] }, async (req: FastifyRequest, res: FastifyReply) => {
    return new GetClassController().handle(req, res);
  });

  fastify.put("/classes/:id", { preHandler: [fastify.authenticate, fastify.isAdmin] }, async (req: FastifyRequest, res: FastifyReply) => {
    return new UpdateClassController().handle(req, res);
  });
}