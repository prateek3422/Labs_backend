import { asyncHandler } from "@/configs/handler";
import { IProblemRepo, TProblem, TProblemCreate, TProblemId } from "@/types/repositories";
import { prisma } from "../database";

class ProblemRepo implements IProblemRepo{
    async createProblem(data: TProblemCreate) {
        const { data: problem, error } = await asyncHandler(prisma.problems.create({data}))
        if (error) {
            return null
        }
        return problem as unknown as TProblem
    }

    async getProblems() {
        const { data: problems, error } = await asyncHandler(prisma.problems.findMany())
        if (error) {
            return null
        }
        return problems as unknown as TProblem[]   }

    async getProblemById(data: TProblemId) {
        const {data:problem, error} = await asyncHandler(prisma.problems.findUnique({where: {id: data.id}}))

        if (error) {
            return null
        }

        return problem as unknown as TProblem
    }
}


export const problemRepo = new ProblemRepo();