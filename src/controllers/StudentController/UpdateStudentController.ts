import { FastifyReply, FastifyRequest } from "fastify";
import { IUpdateStudent } from "../../interfaces/IUpdateStudent";
import { UpdateStudentService } from "../../services/StudentServices/UpdateStudentService";

export class UpdateStudentController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      console.log("Request body:", req.body);

      let { studentId } = req.params as { studentId: string };
      //const objectIdStudentId: ObjectId = new ObjectId(studentId);
      const { name, email, password, church, profilePicture } =
        req.body as Partial<IUpdateStudent>;

      if (!studentId) {
        res.status(400).send({ message: "Student ID is required." });
      }

      if (!name && !email && !password && !church && !profilePicture) {
        res.status(400).send({
          message: "At least one field (name, email,church or password or profilePicture) must be provided.",
        });
      }

      const studentData: Partial<IUpdateStudent> = {};
      if (name) studentData.name = name;
      if (email) studentData.email = email;
      if (password) studentData.password = password;
      if (church !== undefined) studentData.church = church;
      if (profilePicture !== undefined) studentData.profilePicture = profilePicture;

      const studentService = new UpdateStudentService();
      let updatedStudent = await studentService.execute(studentId, studentData);
      updatedStudent.password = ""

      res.status(200).send(updatedStudent);
    } catch (err) {
      res.status(500).send({ error: (err as Error).message });
    }
  }
}

