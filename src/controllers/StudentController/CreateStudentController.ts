import { FastifyRequest, FastifyReply } from "fastify";
import { CreateStudentService } from "../../services/StudentServices/CreateStudentService";
import { ICreateStudent } from "../../interfaces/ICreateStudent";

export class CreateStudentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { name, email, password, church } = req.body as ICreateStudent;
    const studentService = new CreateStudentService();

    try {
      const studentData = await studentService.execute({ name, email, password, church });
      console.log("Estudante gerado pelo serviço:", studentData);
      return res.status(201).send(studentData);
    } catch (err: any) {
      if (err.message.includes("Fill in all required fields")) {
        return res.status(400).send({ error: err.message });
      } else if (err.message.includes("Email already registered")) {
        return res.status(400).send({ error: err.message });
      } else {
        return res.status(500).send({ error: "Internal server error" });
      }
    }
  }
}