import z, { record } from "zod";



export const executeValidation = z.object({
    source_code: record(z.string(), z.string({ required_error: "Source code is required" })),
    language_id: z.number({ required_error: "Language id is required" }),
    stdin: z.array(z.string({ required_error: "Input is required" })),
    expected_output: z.array(z.string({ required_error: "Output is required" })),
    problemId: z.string({ required_error: "Problem id is required" }),
})