import { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../../services/StudentServices/LoginService";
import { IStudentLogin } from "../../interfaces/IStudentLogin";

export class LoginController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as IStudentLogin;
    const studentService = new LoginService();

    try {
      const studentData = await studentService.execute({ email, password });

      return res.status(200).send(studentData);
    } catch (err: any) {
      const errorMessage = err.message || "Internal server error";

      if (
        errorMessage.includes("Fill in all required fields") ||
        errorMessage.includes("Invalid email or password")
      ) {
        return res.status(400).send({ error: errorMessage });
      }

      return res.status(500).send({ error: "Internal server error" });
    }
  }
}
