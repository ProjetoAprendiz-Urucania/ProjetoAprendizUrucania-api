import { FastifyRequest,FastifyReply } from "fastify";
import { UpdateClassService } from "../../services/ClassServices/UpdateClassService";
import { IUpdateClassCard } from "../../interfaces/IUpdateClassCard";

export class UpdateClassController{
    async handle(req: FastifyRequest,res: FastifyReply) {
        const {id} = req.params as {id: string};
        const {name,teacherInfo,coverImage} = req.body as IUpdateClassCard;

        try{
            if(!name && !teacherInfo && !coverImage){
                return res.status(400).send({message: "Either name,teachers or coverImage must be provided."});
            }
    
            const classService = new UpdateClassService(); 
    
            const updatedClass = await classService.execute(id,{name,teacherInfo,coverImage});
            return res.status(200).send(updatedClass);
        } catch(err: any){
            return res.status(500).send({ err: err.message });
        }
        
    }
}