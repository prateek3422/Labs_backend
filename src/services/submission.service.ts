
import { executeRepo } from "@/repositories/queries/execute";
import { problemRepo } from "@/repositories/queries/problem";
import { scoreRepo } from "@/repositories/queries/score";
import { TExecute } from "@/types/repositories";
import { getLanguage, pollBatchResults, SubmissionResponse, submitBatch } from "@/utils/judge0";

class SubmissionService {
    async submitCodeService(data: TExecute) {

        if (
            !Array.isArray(data.stdin) ||
            data.stdin.length === 0 ||
            !Array.isArray(data.expected_output) ||
            data.expected_output.length !== data.stdin.length
        ) {
            return {
                statusCode: 400,
                error: "Invalid or missing test case",
                data: null
            }
        }

        //* praper test cases for judge0 batch submission
        const submission = data.stdin.map((input) => ({
            source_code: data.source_code,
            language_id: data.language_id,
            stdin: input,
        }))

        //* send batch submission to judge0

        const submissionResponse = await submitBatch(submission) as unknown as SubmissionResponse[];

        const token = submissionResponse.map((response) => response.token)

        const result = await pollBatchResults(token)

 
        //* analyze test cases
        let allPassed = true;

        const detailedResults = result.map((result, index) => {
            const stdout = result.stdout?.trim() || "";
            const expected_output = data.expected_output[index].trim();
            const passed = stdout === expected_output;
            if (!passed) allPassed = false;

            return {
                testCase: index + 1,
                passed,
                expectedOutput: expected_output,
                stdout,
                status: result.status.description,
                stderr: result.stderr,
                compileOutput: result.compile_output || null,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} seconds` : undefined,

            }

        })

        const language = getLanguage(data.language_id)

        const SavedSubmission = await executeRepo.submission({
            userId: data.userId,
            problemId: data.problemId,
            sourceCode: data.source_code,
            language,
            stdin: data.stdin.join("\n"),
            stdout: JSON.stringify(detailedResults.map((result) => result.stdout)),
            stderr: detailedResults.some((result) => result.stderr) ? JSON.stringify(detailedResults.map((result) => result.stderr)) : "",
            compileOutput: detailedResults.some((result) => result.compileOutput) ? JSON.stringify(detailedResults.map((result) => result.compileOutput)) : "",
            status: allPassed ? "Accepted" : "Wrong Answer",
            time: detailedResults.some((result) => result.time) ? JSON.stringify(detailedResults.map((result) => result.time)) : "",
            memory: detailedResults.some((result) => result.memory) ? JSON.stringify(detailedResults.map((result) => result.memory)) : "",
        })



        if (!SavedSubmission) {
            return {
                statusCode: 500,
                error: "Failed to save submission",
                data: null
            }
        }
    
        if (allPassed) {
            const solved = await executeRepo.solvedProblem({
                userId: data.userId,
                problemId: data.problemId
            })

            // console.log(solved, "solved problem")

            if (!solved) {
                return {
                    statusCode: 500,
                    error: "Failed to save solved problem",
                    data: null
                }
            }

            // const userActivity = await userRepo.createUserActivity({
            //     userId: data.userId,
            //     problemsolvedId: solved?.id
            // })

            // console.log(userActivity, "user activity")

            const problem = await problemRepo.getProblemById({ id: data.problemId })


            if (problem?.isContestProblem) {
                const score = await scoreRepo.createScore({
                    userId: data.userId,
                    timeTaken: detailedResults.some((result) => result.time)
                        ? detailedResults
                            .map((result) => Number.parseFloat(result.time || "0"))
                            .reduce((a, b) => a + b, 0)
                        : 0,
                    score: 10, 
                    contestId: data?.contestId || ""
                }

                )

                if (!score) {
                    return {
                        statusCode: 500,
                        error: "Failed to save score",
                        data: null
                    }
                }

            }

        }

        const testCasesResults = detailedResults.map((result) => ({
            submissionId: SavedSubmission.id,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expectedOutput: result.expectedOutput,
            compileOutput: result.compileOutput,
            stderr: result.stderr,
            status: result.status as string,
            memory: result.memory,
            time: result.time
        }))

        // @ts-expect-error does not exist on type 'PrismaClient'
        const savedTestCases = await executeRepo.testCases(testCasesResults)



        if (!savedTestCases) {
            return {
                statusCode: 500,
                error: "Failed to save test cases",
                data: null
            }
        }

        return {
            statusCode: 201,
            message: "code submitted successfully",
            data: {
                submission: SavedSubmission,
                testCases: detailedResults
            }
        }


    }

    async getAllSubmissionsService(userId: string) {
        const submissions = await executeRepo.getAllSubmissions({ userId })

        if (!submissions) {
            return {
                statusCode: 404,
                error: "No submission found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Submissions fetched successfully",
            data: submissions
        }

    }

    async getSubmissionByProblemIdService(userId: string, problemId: string) {
        const submission = await executeRepo.getSubmissionByProblemId({ userId, problemId })

        if (!submission) {
            return {
                statusCode: 404,
                error: "No submission found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Submissions fetched successfully",
            data: submission
        }
    }

    async getSubmissionCountService(problemId: string) {
        const submissionCount = await executeRepo.getSubmissionCount(problemId)

        if (!submissionCount) {
            return {
                statusCode: 404,
                error: "No submission found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Submissions fetched successfully",
            data: submissionCount
        }
    }

    getSolvedProblemService = async (userId: string, problemId: string) => {
        const solvedProblem = await executeRepo.getSolvedProblem({ userId, problemId })

        if (!solvedProblem) {
            return {
                statusCode: 404,
                error: "No solved problem found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Solved problem fetched successfully",
            data: solvedProblem
        }
    }

    async getAllSubmissionService () {
        const submissions = await executeRepo.getAllSubmission()

        if (!submissions) {
            return {
                statusCode: 404,
                error: "No submission found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "Submissions fetched successfully",
            data: submissions
        }
    }
}

export const submissionService = new SubmissionService();