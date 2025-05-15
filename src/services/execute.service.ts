import { executeRepo } from "@/repositories/queries/execute";
import { TExecute } from "@/types/repositories/execute";
import { getLanguage, pollBatchResults, submitBatch } from "@/utils/judge0";

interface SubmissionResponse {
    token: string;
}

// Define interface for result
// interface JudgeResult {
//     stdout: string;
//     status: {
//         id: number;
//     };
// }
class ExecuteService {
    async executeCodeService(data: TExecute) {

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


        // praper test cases for judge0 batch submission

        const submission = data.stdin.map((input) => (
            {
                source_code: data.source_code,
                language_id: data.language_id,
                stdin: input,
            }
        )) 

        // send batch submission to judge0
        const submissionResponse = await submitBatch(submission) as unknown as SubmissionResponse[];

        const token = submissionResponse.map((response) => response.token)

        const result = await pollBatchResults(token)

        // analyze test cases

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
            };


 
        })

        //store submission result in database

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
        // if all test cases passed, mark the problem as solved

        if(allPassed){
            await executeRepo.solvedProblem({
                userId: data.userId,
                problemId: data.problemId
            })
        }

        // save individual test cases result using detailedResults

        const testCasesResults = detailedResults.map((result) => ({
            submissionId: SavedSubmission.id as string,
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
       const savedTestCases = await executeRepo.testCases({testCasesResults })

        if (!savedTestCases) {
            return {
                statusCode: 500,
                error: "Failed to save test cases",
                data: null
            }
        }
        



        return {
            statusCode: 200,
            error: null,
            message: "code executed successfully",
        }


    }
}


export const executeService = new ExecuteService();