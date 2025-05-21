import { asyncHandler } from "@/configs/handler";
;
import { prisma } from "../database";
import { IExportRepo, TSolvedProblem, TSubmission, TTestCases, TUserId } from "@/types/repositories";

class ExecuteRepo implements IExportRepo {
    async submission(data: TSubmission) {
        const { data: executeCode, error } = await asyncHandler(prisma.submissions.create({ data }))
        if (error) {
            // console.log(error, "error in submission")
            return null
        }
        return executeCode as unknown as TSubmission
    }

    async solvedProblem(data: TSolvedProblem) {
        const { data: solvedProblem, error } = await asyncHandler(prisma.problemSolved.upsert({
            where: {
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

        if (error) {
            return null
        }

        return solvedProblem as unknown as TSolvedProblem

    }
    //@ts-expect-error  it becomes a problem when we use the createMany
    async testCases(data:{testCasesResults: TTestCases[]}) {
        // console.log(testCasesResults)
        const { data: testCase, error } = await asyncHandler(prisma.testCases.createMany({
            data: data?.testCasesResults
        }))

        if (error) {
            // console.log(error, "error in test cases")
            return null
        }

        return testCase as unknown as TTestCases[]
    }

    async getAllSubmissions(data: TUserId) {
        const { data: allSubmissions, error } = await asyncHandler(prisma.submissions.findMany({
            where: {
                userId: data.userId
            }
        }))

        if (error) {
            return null
        }

        return allSubmissions as unknown as TSubmission[]
    }

    async getSubmissionByProblemId(data: TUserId) {
        const { data: submissionByProblemId, error } = await asyncHandler(prisma.submissions.findMany({
            where: {
                userId: data.userId,
                problemId: data.problemId
            }
        }))

        if (error) {
            return null
        }

        return submissionByProblemId as unknown as TSubmission[]
    }

    async getSubmissionCount(problemId: string) {
        const { data: submissionCount, error } = await asyncHandler(prisma.submissions.count({
            where: {
                problemId : problemId
            }
        }))

        if (error) {
            return null
        }

        return submissionCount as unknown as number
    }

}



export const executeRepo = new ExecuteRepo()