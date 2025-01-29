import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteClassService } from "../../services/ClassServices/DeleteClassService";

export class DeleteClassController {
    async handle(req: FastifyRequest,res: FastifyReply){
        try{
            const {id} = req.body as {id: string};

            if(!id){
                return res.status(400).send({ error: "ID is required." });
            }

            const classService = new DeleteClassService();
            const deletedClass = await classService.execute(id);
            res.status(200).send(deletedClass);
        } catch(err: any) {
            return res.status(500).send({ err: err.message });
        }
    }
}