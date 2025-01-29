import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteLessonService } from "../../services/LessonServices/DeleteLessonService";

export class DeleteLessonController {
    async handle(req: FastifyRequest,res: FastifyReply){
        try{
            const {lessonId} = req.body as {lessonId: string};

            if(!lessonId){
                return res.status(400).send({ error: "ID is required." });
            }

            const classService = new DeleteLessonService();
            const deletedClass = await classService.execute(lessonId);
            res.status(200).send(deletedClass);
        } catch(err: any) {
            return res.status(500).send({ err: err.message });
        }
    }
}