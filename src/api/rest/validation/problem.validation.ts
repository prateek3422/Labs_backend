import { z } from "zod";

// Define enums separately for better reusability
export const difficultyEnum = z.enum([
    "EASY",
    "MEDIUM",
    "HARD"
], {
    errorMap: () => ({ message: "Difficulty must be EASY, MEDIUM or HARD" })
});

// Define reusable schemas
// const exampleSchema = z.object({
//     input: z.string({ required_error: "Example input is required" }),
//     output: z.string({ required_error: "Example output is required" }),
//     explanation: z.string().optional(),
// });

const testCaseSchema = z.object({
    input: z.string({ required_error: "Test case input is required" }),
    output: z.string({ required_error: "Test case output is required" }),
});


// Main validation schema
const createProblemValidation = z.object({
    title: z.string({ required_error: "Title is required" })
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title cannot exceed 50 characters"),

    description: z.string({ required_error: "Description is required" })
        .min(10, "Description must be at least 10 characters"),

    tags: z.array(z.string({ required_error: "Tag is required" }))
        .nonempty("At least one tag is required"),

    difficulty: difficultyEnum,
    example: z.object({
        JAVASCRIPT: z.object({
            input: z.string().min(1, "Input is required"),
            output: z.string().min(1, "Output is required"),
            explanation: z.string().optional(),
        }),
        PYTHON: z.object({
            input: z.string().min(1, "Input is required"),
            output: z.string().min(1, "Output is required"),
            explanation: z.string().optional(),
        }),
        JAVA: z.object({
            input: z.string().min(1, "Input is required"),
            output: z.string().min(0, "Output is required"),
            explanation: z.string().optional(),
        }),
      }),

    constraints: z.string({ required_error: "Constraints are required" }).nonempty("At least one constraint is required"),

    testCases: z.array(testCaseSchema)
        .min(0, { message: "At least one test case is required" })
        .max(10, { message: "Maximum 10 test cases are allowed" }),

    codeSnippet: z.object({
        JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
        PYTHON: z.string().min(1, "Python code snippet is required"),
        JAVA: z.string().min(1, "Java solution is required"),
          }),

    referenceSolutions: z.object({
        JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
        PYTHON: z.string().min(1, "Python solution is required"),
        JAVA: z.string().min(1, "Java solution is required"),
          }),

    hints: z.string().optional(),

    editorial: z.string().optional(), // You might want to define a more specific schema for editorial
});

// Create a partial schema for updates
const updateProblemValidation = createProblemValidation.partial();

// Type inference
export type Problem = z.infer<typeof createProblemValidation>;

// // Export validation functions
// export const validateProblemData = (data: Problem) =>
//     createProblemValidation.safeParse(data);

// export const validateUpdateProblemData = (data: Partial<Problem>) =>
//     updateProblemValidation.safeParse(data);



export { createProblemValidation, updateProblemValidation };