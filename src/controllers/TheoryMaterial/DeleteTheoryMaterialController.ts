import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteStudentService } from "../../services/StudentServices/DeleteStudentService";

export class DeleteStudentController {
    async handle(req: FastifyRequest,res: FastifyReply){
        try{
            const {studentId} = req.body as {studentId: string};

            if(!studentId){
                return res.status(400).send({ error: "ID is required." });
            }

            const studentService = new DeleteStudentService();
            const deletedStudent = await studentService.execute(studentId);
            res.status(200).send(deletedStudent);
        } catch(err: any) {
            return res.status(500).send({ err: err.message });
        }
    }
}