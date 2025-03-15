import { FastifyRequest, FastifyReply } from "fastify";
import { GetStudentService } from "../../services/StudentServices/GetStudentService";

import sendEmail from "../../services/NodeMailerServices/SendEmailNodeMailer";
import EmailTemplate from "../../services/NodeMailerServices/EmailTemplate";
import { app } from "../../server/server";
import { hash } from "crypto";

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
          const token = app.jwt.sign(
            { id: getByEmail.id, name: getByEmail.name, email: getByEmail.email },
            { expiresIn: "20m" }
          );
          console.log(`\n\n\nid:${getByEmail.id}\n\n\n`)
          sendEmail("thiagolessa53@gmail.com",
            "Código de Renovação de senha música Maranata",
            EmailTemplate(token));

          return res.status(200).send({ hash:" " }); 
        }
        getByEmail.password = ""
        res.status(200).send(getByEmail);
      }
    } catch (err: any) {
      res.send({ message: err.message });
    }
  }
}
