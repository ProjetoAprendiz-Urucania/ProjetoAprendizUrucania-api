import { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../../services/StudentServices/LoginService";
import { IStudentLogin } from "../../interfaces/IStudentLogin";

export class LoginController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as IStudentLogin;

    if (!email || !password) {
      return res.status(400).send({ error: "Preencha todos os campos obrigatórios" });
    }

    const studentService = new LoginService();

    try {
      const studentData = await studentService.execute({ email, password });
      res.status(200).send(studentData);
      
    } catch (err: any) {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Erro interno no servidor";
      
      return res.status(statusCode).send({ error: message });
    }
  }
}
