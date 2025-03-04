import { FastifyRequest, FastifyReply } from "fastify";
import { GetStudentService } from "../../services/StudentServices/GetStudentService";

import bcrypt from "bcrypt";
import sendEmail from "../../services/NodeMailerServices/SendEmailNodeMailer";
import EmailTemplate from "../../services/NodeMailerServices/EmailTemplate";

export class GetStudentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { studentId, email } = req.query as {
      studentId?: string;
      email?: string;
    };

    const getStudentService = new GetStudentService();

    try {
      if (!studentId && !email) {
        const students = await getStudentService.execute();
         res.status(200).send(students);
      }

      if (studentId) {
        const getById = await getStudentService.execute(studentId, undefined);
        if (!getById) {
          res.status(404).send({ message: "Student not found." });
        }
         res.status(200).send(getById);
      }

      if (email) {
        const getByEmail = await getStudentService.execute(undefined, email);
        if (!getByEmail) {
          return res.status(404).send({ message: "Student not found." });
        }

        if (req.method === "POST") {
          const randomCode = Math.floor(100000 + Math.random() * 900000);
          const hash = await bcrypt.hash(String(randomCode), 10);

          sendEmail("thiagolessa53@gmail.com",
          "Código de Renovação de senha música Maranata",
          EmailTemplate(String(randomCode)));

          return res.status(200).send({ hash: hash });
        }
        getByEmail.password = ""
        res.status(200).send(getByEmail);
      }
    } catch (err: any) {
       res.send({ message: err.message });
    }
  }
}
