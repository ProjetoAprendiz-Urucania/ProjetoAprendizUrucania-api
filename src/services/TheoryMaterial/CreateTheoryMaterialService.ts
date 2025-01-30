import { FastifyRequest, FastifyReply } from "fastify";
import { CreateStudentService } from "../StudentServices/CreateStudentService";
import { ICreateStudentCard } from "../../interfaces/ICreateStudentCard";

export class CreateStudentController {
  async handle(
    req: FastifyRequest,
    res: FastifyReply
  ) {

    const { name, email, password, church } = req.body as ICreateStudentCard;

    const studentService = new CreateStudentService();

    try {
      const studentData = await studentService.execute({
        name,
        email,
        password,
        church
      });
      return res.status(200).send(studentData);
    } catch (err: any) {
      if (
        err.message.includes("Fill in all required fields")
      ) {
        return res.status(400).send({ error: err.message });
      } else {
        return res.status(500).send({ error: "Internal server error" });
      }
    }
  }
}