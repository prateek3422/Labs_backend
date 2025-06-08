import { z } from "zod";

const createCommentValidation = z.object({
    comment: z.string({ required_error: "Comment is required" }).min(5, { message: "minimum 5 characters required" }),
    comunityId: z.string({ required_error: "Comunity id is required" }).min(1, { message: "Comunity id is required" }),
})

const updateCommentValidation = z.object({
    comment: z.string({ required_error: "Comment is required" }).min(5, { message: "minimum 5 characters required" }),
    commentId: z.string({
        required_error: "Comment id is required"
    }).min(1, {
        message: "Comment id is required"
    }),
})

const deleteCommentValidation = z.object({
    commentId: z.string({
        required_error: "Comment id is required"
    }).min(1, {
        message: "Comment id is required"
    }),
})

export {
    createCommentValidation,
    updateCommentValidation
    , deleteCommentValidation
}