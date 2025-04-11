import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import jwt from "@fastify/jwt";
import * as dotenv from "dotenv";
import FastifyMultipart from "@fastify/multipart";

import { classRoutes } from "../routes/class.routes";
import { lessonRoutes } from "../routes/lesson.routes";
import { studentRoutes } from "../routes/students.routes";
import { theoryMaterialRoutes } from "../routes/theoryMaterials.routes";
import { userClassRoutes } from "../routes/userClass.routes";
import { awsRoutes } from "../routes/aws.routes";
import { frequencyList } from "../routes/frequencyList.routes";


dotenv.config();

const PORT = process.env.PORT || 5722;
const SECRET_KEY = process.env.JWT || "c9bd4601dd9f791eedf663b0eec348cbad4578b1c70cfeaeeaf38e087533693f" 

const app = Fastify({ logger: true });

async function start() {
  await app.register(jwt,{secret: SECRET_KEY});


  app.decorate("authenticate", async (req: any, res: any) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      return res.status(401).send({ error: "Unauthorized/expired token" });
    }
  });
  
  app.decorate("isAdmin", async (req: any, res: any) => {
    if (req.user.role !== "admin") {
      return res.status(403).send({ error: "Access denied. Admins only." });
    }
  });

  await app.register(cors);
  await app.register(fastifyFormbody);
  await app.register(FastifyMultipart)

  await app.register(classRoutes);
  await app.register(lessonRoutes);
  await app.register(studentRoutes);
  await app.register(theoryMaterialRoutes);
  await app.register(userClassRoutes);
  await app.register(awsRoutes);
  await app.register(frequencyList);

  try {
    await app.listen({ port: Number(PORT) });
    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();

export {app}
