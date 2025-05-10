import { string, z } from "zod"

const createProblemValidation = z.object({
    title: z.string({ required_error: "Title is required" }).max(50).min(3),
    description: z.string({ required_error: "Description is required" }).min(10),
    tags: z.array(z.string({ required_error: "Tag is required" })),
    difficulty: z.enum([
        "EASY",
        "MEDIUM",
        "HARD"
    ], {
        errorMap: () => ({ message: "Difficulty must be EASY, MEDIUM or HARD" })
    }),
    examples: z.array(
        z.object({
            input: z.string({ required_error: "Example input is required" }),
            output: z.string({ required_error: "Example output is required" }),
            explanation: z.string({ required_error: "Example explanation is required" }).optional(),
        })
      ),
    constraints: z.string({ required_error: "Constraints is required" }), 

    testCases: z.array(z.object({
        input: z.string({ required_error: "test case input is required" }),
        output: z.string({ required_error: "test case output is required" }),
    })).min(1, { message: "At least one testcase is required" })
        .max(10, { message: "Maximum 10 testcases are allowed" }),

    codeSnippet: z.object({
      language: z.string({ required_error: "Language is required" }),
    }),

    referenceSolution: z.object({
        language: string({ required_error: "Language is required" }),
    })


})



export { createProblemValidation }