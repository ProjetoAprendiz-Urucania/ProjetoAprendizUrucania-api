import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import jwt from "@fastify/jwt";
import * as dotenv from "dotenv";
import pino from "pino"

import { classRoutes } from "../routes/class.routes";
import { lessonRoutes } from "../routes/lesson.routes";
import { studentRoutes } from "../routes/students.routes";
import { theoryMaterialRoutes } from "../routes/theoryMaterials.routes";

dotenv.config();

const PORT = process.env.PORT || 5722;
const SECRET_KEY = process.env.JWT || "c9bd4601dd9f791eedf663b0eec348cbad4578b1c70cfeaeeaf38e087533693f" 

const app = Fastify({
  logger: process.env.NODE_ENV === "development"
    ? pino({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
            messageFormat: "{req.method} {req.url} {res.statusCode}"
          }
        }
      })
    : true, 
});

// Hook para logar requisições
app.addHook("onRequest", (request, reply, done) => {
  request.log.info({ method: request.method, url: request.url }, "Request received");
  done();
});

// Hook para logar respostas
app.addHook("onResponse", (request, reply, done) => {
  request.log.info({ method: request.method, url: request.url, statusCode: reply.statusCode }, "Response sent");
  done();
});


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

  await app.register(classRoutes);
  await app.register(lessonRoutes);
  await app.register(studentRoutes);
  await app.register(theoryMaterialRoutes);

  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0"  });
    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();

export {app}
