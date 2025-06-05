import { asyncHandler } from "@/configs/handler";
import { IScoreRepo, TScore } from "@/types/repositories/score";
import { prisma } from "../database";

class ScoreRepo implements IScoreRepo{
    async createScore(data: TScore) {
        const {data: score, error} = await asyncHandler(prisma.score.upsert({
            where:{
                userId_contestId: {
                    userId: data.userId,
                    contestId: data.contestId
                                }},
            update: {
                score: data.score,
                userId: data.userId,
                timeTaken: new Date(data.timeTaken),
            
            },
            create: {
                score: data.score,
                userId: data.userId,
                timeTaken: new Date(data.timeTaken),
                contestId: data.contestId
              
            }
        }))
        

        if (error) {
            return null;
        }
        return score as unknown as TScore;
    }
}


export const scoreRepo = new ScoreRepo();