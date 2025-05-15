import z from "zod";



export const executeValidation = z.object({
    source_code: z.string({ required_error: "Source code is required" }).min(10, "Code must be at least 10 characters").max(5000, "Code cannot exceed 5000 characters"),
    language_id: z.number({ required_error: "Language id is required" }),
    stdin: z.array(z.string({ required_error: "Input is required" })),
    expected_output: z.array(z.string({ required_error: "Output is required" })),
    problemId: z.string({ required_error: "Problem id is required" }),
})