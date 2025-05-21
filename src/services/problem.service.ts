import { problemRepo } from "@/repositories/queries/problem"
import { TGetProblems, TProblem, TProblemCreate } from "@/types/repositories"
import { getJudge0Languages, pollBatchResults, submitBatch } from "@/utils/judge0"

interface SubmissionResponse {
    token: string;
}

// Define interface for result
interface JudgeResult {
    status: {
        id: number;
    };
}
class ProblemService {
    createProblemService = async (data: TProblemCreate) => {

        for (const [language, solCode] of Object.entries(data.referenceSolutions)) {
            const languageId = getJudge0Languages(language)

            if (!languageId) {
                return {
                    statusCode: 400,
                    error: "Language not supported",
                    data: null
                }
            }
            // console.log(data, "data")

            const submission = data.testCases.map(({ input, output }) => ({
                source_code: solCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,

            }))

            const submittionResult = await submitBatch(submission) as unknown as SubmissionResponse[];

            // console.log(submittionResult, "tokens")

            const tokens: string[] = submittionResult.map((response: SubmissionResponse) => response.token)

            const results = await pollBatchResults(tokens) as JudgeResult[];

            for (const [index, result] of results.entries()) {
                // console.log("result", result)
                if (result.status.id !== 3) {
                    return {
                        statusCode: 400,
                        error: `Testcase ${index + 1} failed for language ${language}`,
                        data: null
                    }
                }
            }
        }
        // console.log(userId, "userId")
        const newProblem = await problemRepo.createProblem(
            {
                title: data.title,
                description: data.description,
                tags: data.tags,
                difficulty: data.difficulty,
                example: data.example,
                constraints: data.constraints,
                testCases: data.testCases,
                codeSnippet: data.codeSnippet,
                referenceSolutions: data.referenceSolutions,
                userId: data.userId,
            }
        )

        return {
            statusCode: 201,
            message: "Problem created successfully",
            data: newProblem
        }

    }

    getAllProblemsService = async ({page, limit, query, difficulty, tags, sort,}: TGetProblems) => {
        const problems = await problemRepo.getProblems({page, limit, query, difficulty, tags, sort, })

        if (!problems) {
            return {
                statusCode: 404,
                error: "No problems found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Problems fetched successfully",
            data: problems
        }
    }

    getProblemByIdService = async (id: string) => {

        const problem = await problemRepo.getProblemById({ id })

        if (!problem) {
            return {
                statusCode: 404,
                error: "Problem not found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Problem fetched successfully",
            data: problem
        }

    }

    updateProblemService = async (data:TProblem ) =>{
        const problem = await problemRepo.getProblemById({ id: data.id })
        if (!problem) {
            return {
                statusCode: 404,
                error: "Problem not found",
                data: null
            }
        }

        for (const [language, solCode] of Object.entries(data.referenceSolutions)) {
            const languageId = getJudge0Languages(language)
            if (!languageId) {
                return {
                    statusCode: 400,
                    error: "Language not supported",
                    data: null
                }
            }

            const submission  = data.testCases.map(({input, output}) => ({
                source_code: solCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }))

            const submittionResult = await submitBatch(submission) as unknown as SubmissionResponse[];
            const tokens: string[] = submittionResult.map((response: SubmissionResponse) => response.token)

            const results = await pollBatchResults(tokens) as JudgeResult[];

            for (const [index, result] of results.entries()) {
                if (result.status.id !== 3) {
                    return {
                        statusCode: 400,
                        error: `Testcase ${index + 1} failed for language ${language}`,
                        data: null
                    }
                }
            }

        }

        const updatedProblem = await problemRepo.updateProblem({
            id: data.id,
            title: data.title,
            description: data.description,
            tags: data.tags,
            difficulty: data.difficulty,
            example: data.example,
            constraints: data.constraints,
            hints: data.hints ,
            editorial: data.editorial,
            testCases: data.testCases,
            codeSnippet: data.codeSnippet,
            referenceSolutions: data.referenceSolutions,
            userId: data.userId
        })

        return {
            statusCode: 201,
            message: "Problem update successfully",
            data: updatedProblem
              }
    }

    deleteProblemService = async (id: string) => {
        const problem = await problemRepo.deleteProblem({ id })

        if (!problem) {
            return {
                statusCode: 404,
                error: "Problem not found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Problem deleted successfully",
            data: problem
        }
    }

}

export const problemService = new ProblemService()
