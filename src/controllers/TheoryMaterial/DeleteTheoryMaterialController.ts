import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTheoryMaterialService } from "../../services/TheoryMaterial/DeleteTheoryMaterialService.";

export class DeleteTheoryMaterialController {
    async handle(req: FastifyRequest,res: FastifyReply){
        try{
            const {theoryMaterialId} = req.body as {theoryMaterialId: string};

            if(!theoryMaterialId){
                return res.status(400).send({ error: "ID is required." });
            }

            const theoryMaterialService = new DeleteTheoryMaterialService();
            const deletedTheoryMaterial = await theoryMaterialService.execute(theoryMaterialId);
            res.status(200).send(deletedTheoryMaterial);
        } catch(err: any) {
            return res.status(500).send({ err: err.message });
        }
    }
}