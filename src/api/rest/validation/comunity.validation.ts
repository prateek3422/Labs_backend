import { z } from "zod";

const createComunityValidation = z.object({
    title: z.string({required_error: "Title is required"}).min(5, { message: "minimum 5 characters required" }),
    content: z.string({
        required_error: "Content is required"
    }).min(10, { message: "minimum 10 characters required" }),
    image: z.string().optional(),
    tags: z.array(z.string({ message: "Tag is required" })).min(1, { message: "At least one tag is required" })
})

const updateComunityValidation = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

export{
    createComunityValidation
    , updateComunityValidation
}