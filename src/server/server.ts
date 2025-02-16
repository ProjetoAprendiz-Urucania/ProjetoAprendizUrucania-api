import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import * as dotenv from "dotenv";

import { classRoutes } from "../routes/class.routes";
import { lessonRoutes } from "../routes/lesson.routes";
import { studentRoutes } from "../routes/students.routes";
import { theoryMaterialRoutes } from "../routes/theoryMaterials.routes";

dotenv.config();

const PORT = process.env.PORT || 5722;

const app = Fastify({ logger: true });

const start = async () => {
  await app.register(cors);
  await app.register(fastifyFormbody);

  await app.register(classRoutes);
  await app.register(lessonRoutes);
  await app.register(studentRoutes);
  await app.register(theoryMaterialRoutes);

  try {
    await app.listen({ port: Number(PORT) });
    console.log("Server is running on http://localhost:5721");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
