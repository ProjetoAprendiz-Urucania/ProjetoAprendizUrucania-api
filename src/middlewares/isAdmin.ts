import { FastifyRequest, FastifyReply } from "fastify";

interface User {
  role: string;
}

export async function isAdmin(req: FastifyRequest, res: FastifyReply): Promise<void> {
  try {
    await req.jwtVerify(); 
    const user = req.user as User;

    if (!user || user.role !== "admin") {
      res.status(403).send({ message: "Access denied: Admin privileges required" });
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid or missing token" });
  }
}
