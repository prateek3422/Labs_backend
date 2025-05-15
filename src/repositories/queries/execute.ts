import { asyncHandler } from "@/configs/handler";
;
import { prisma } from "../database";
import { IExportRepo, TSolvedProblem, TSubmission, TTestCases } from "@/types/repositories";

class ExecuteRepo implements IExportRepo {
    async submission(data: TSubmission) {
        const {data: executeCode, error} = await asyncHandler(prisma.submissions.create({data}))
        if (error) {
            return null
        }
        return executeCode as unknown as TSubmission   
    }

    async solvedProblem (data: TSolvedProblem) {
        const {data: solvedProblem, error} = await asyncHandler(prisma.problemSolved.upsert({
            where:{
                userId_problemId: {
                    userId: data.userId,
                    problemId: data.problemId
                }
            },
            update: {},

            create: {
                userId: data.userId,
                problemId: data.problemId
            }
        }))

        if(error) {
            return null
        }

        return solvedProblem as unknown as TSolvedProblem

    }

    async testCases(data: TTestCases) {
        const {data: testCase, error} = await asyncHandler(prisma.testCases.createMany({data}))
        if (error) {
            return null
        }
        return testCase as unknown as TTestCases
    }
    
    

}



export const executeRepo = new ExecuteRepo()