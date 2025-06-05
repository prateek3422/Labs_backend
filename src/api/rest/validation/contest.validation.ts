import { z } from "zod";


const createContestValidation = z.object({
    name: z.string().min(1, "Contest name is required"),
    description: z.string().min(1, "Contest description is required"),
    startTime: z.string({
        required_error: "Contest start time is required",    }),
    endTime: z.string({required_error: "Contest end time is required"}),
    problemIds: z.array(z.string()).min(1, "At least one problem ID is required"),
})


export {
    createContestValidation
}