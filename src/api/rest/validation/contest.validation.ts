import { z } from "zod";


const createContestValidation = z.object({
    name: z.string().min(1, "Contest name is required"),
    description: z.string().min(1, "Contest description is required"),
    startTime: z.date().refine(date => date > new Date(), {
        message: "Start time must be in the future"
    }),
    endTime: z.date().refine(date => date > new Date(), {
        message: "End time must be in the future"
    }),
    problemIds: z.array(z.string()).min(1, "At least one problem ID is required"),
})


export {
    createContestValidation
}