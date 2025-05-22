import { z } from "zod";

const createCommentValidation = z.object({
    comment: z.string({required_error: "Comment is required"}).min(5, { message: "minimum 5 characters required" }),
})

export {
    createCommentValidation
}