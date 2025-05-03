import { z } from "zod";



const createUserValidation  =  z.object({
    name : z.string({required_error: "Name is required"}).max(20).min(3),
    email: z.string({required_error: "Email is required"}).email(),
    image: z.string({required_error: "Image are required "}).optional(),
    password: z.string({required_error: "password is required"}).min(6),
    
})

export {
    createUserValidation
}