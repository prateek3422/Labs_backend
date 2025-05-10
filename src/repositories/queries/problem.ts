import { asyncHandler } from "@/configs/handler";
import { IProblemRepo, TProblem, TProblemCreate } from "@/types/repositories";
import { prisma } from "../database";

class ProblemRepo implements IProblemRepo{
    async createProblem(data: TProblemCreate) {
        const { data: problem, error } = await asyncHandler
        //@ts-ignore
        (prisma.problems.create( {data}))
        if (error) {
            return null
        }
        return problem as unknown as TProblem
    }
}


export const problemRepo = new ProblemRepo();