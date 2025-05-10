import { problemRepo } from "@/repositories/queries/problem"
import { getJudge0Languages, pollBatchResults, submitBatch } from "@/utils/judge0"

interface ICreateProblem {
    title: string
    description: string
    tags?: string[]
    difficulty: "EASY" | "MEDIUM" | "HARD"
    examples: [
        {
            input: string
            output: string
            explanation?: string
        }
    ]
    constraints: string[]

    testCases: { input: string; output: string }[]
    codeSnippet: {
        language: string
    }
    referenceSolution: {
        language: string
    }
}

class ProblemService {
    createProblemService = async (data: ICreateProblem, userId: string) => {

        for (const [language, solCode] of Object.entries(data.referenceSolution)) {
            const languageId = getJudge0Languages(language)

            if (!languageId) {
                return {
                    statusCode: 400,
                    error: "Language not supported",
                    data: null
                }
            }

            const submission = data.testCases.map(({ input, output }) => ({
                source_code: solCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
                // cpu_time_limit: 2,
                // memory_limit: 128,
            }))

            const submittionResult = await submitBatch(submission as any)


            const tokens = submittionResult.map((res: {
                token: string
            }) => res.token)

            const results = await pollBatchResults(tokens)

            for (let i = 0; i < results.length; i++) {
                const result = results[i]
                // console.log("result", result)
                if (result.status.id !== 3) {
                    return {
                        statusCode: 400,
                        error: `Testcase ${i + 1} failed for language ${language}`,
                        data: null
                    }
                }
            }
        }
        // console.log(userId, "userId")
        // console.log(data, "data")
        const newProblem = await problemRepo.createProblem({
            title: data.title,
            description: data.description,
            tags: data.tags,
            difficulty: data.difficulty,
            example: data.examples,
            constraints: data.constraints,
            testCases: data.testCases,
            codeSnippet: data.codeSnippet,
            userId: userId,
            referenceSolutions: data.referenceSolution,
        })
        if (!newProblem) {
            return {
                statusCode: 500,
                message: "Internal server error",
                data: null
            }
        }
        return {
            statusCode: 201,
            message: "Problem created successfully",
            data: newProblem
        }

    }
}

export const problemService = new ProblemService()
