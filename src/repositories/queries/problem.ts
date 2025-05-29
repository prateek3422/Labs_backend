import { asyncHandler } from "@/configs/handler";
import { IProblemRepo, TGetProblems, TProblem, TProblemCreate, TProblemId } from "@/types/repositories";
import { prisma } from "../database";

class ProblemRepo implements IProblemRepo {
    async createProblem(data: TProblemCreate) {
        const { data: problem, error } = await asyncHandler(prisma.problems.create({ data }))
        if (error) {
            return null
        }
        return problem as unknown as TProblem
    }

    async getProblems({ page, limit, query, difficulty, tags }: TGetProblems) {

        
        const tagsArray = Array.isArray(tags) ? tags : tags
        // console.log(tagsArray, "tags")
       
        const { data: problems, error } = await asyncHandler(prisma.problems.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                AND: [
                    // Search query filter
                    query ? {
                        title:{
                            contains: query,
                            mode: "insensitive"
                        }
                    } : {},

                    // Difficulty filter
                    difficulty ? { difficulty } : {},


                    // Tags filter - assuming tags are in a related table
                    tagsArray && tagsArray.length > 0 ? {
                        tags: {
                            hasSome: tagsArray,
                        }
                    } : {},
                ]
            },
            orderBy: {
                difficulty: "asc",
            },

        }))
        if (error) {
            return null
        }
        return problems as unknown as TProblem[]
    }

    async getProblemById(data: TProblemId) {
        const { data: problem, error } = await asyncHandler(prisma.problems.findUnique({ where: { id: data.id } }))

        if (error) {
            return null
        }

        return problem as unknown as TProblem
    }

    async deleteProblem(data: TProblemId) {
        const { data: deleteProblem, error } = await asyncHandler(prisma.problems.delete({ where: { id: data.id } }))

        if (error) {
            return null
        }

        return deleteProblem as unknown as TProblem

    }

    async updateProblem(data: TProblem) {
        const { data: updateProblem, error } = await asyncHandler(prisma.problems.update({
            where: { id: data.id },
            data: {
                title: data.title,
                description: data.description,
                tags: data.tags,
                difficulty: data.difficulty,
                example: data.example,
                constraints: data.constraints,
                hints: data.hints,
                editorial: data.editorial,
                testCases: data.testCases,
                codeSnippet: data.codeSnippet,
                referenceSolutions: data.referenceSolutions
            }
        }));

        if (error) {
            return null;
        }

        return updateProblem as unknown as TProblem;
    }

    async getAllProblemsSolvedByUser(userId: string ) {
        const { data: problems, error } = await asyncHandler(prisma.problems.findMany({
            where: {
                solvedBy:{
                    some:{
                        userId: userId
                    }
                }
            },
            include:{
                solvedBy:{
                    where:{
                        userId: userId
                    }
                }
            }
        }))

        if (error) {
            return null
        }

        return problems as unknown as TProblem[]
    }
}


export const problemRepo = new ProblemRepo();