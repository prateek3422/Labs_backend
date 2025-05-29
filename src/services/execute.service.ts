
import { TExecute } from "@/types/repositories/execute";
import {pollBatchResults, submitBatch } from "@/utils/judge0";

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

        // console.log(data)
        
        // praper test cases for judge0 batch submission
        const submission = data.stdin.map((input) => (
            {
                source_code: data.source_code,
                language_id: data.language_id,
                stdin: input,
            }
        ))

        // console.log("Submission prepared for batch execution:", submission);

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
                allPassed
            };
        })


        return {
            statusCode: 200,
            message: "code executed successfully",
            data: detailedResults
        }


    }
}


export const executeService = new ExecuteService();