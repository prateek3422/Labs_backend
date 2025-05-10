
import { z } from "zod"

const createUserValidation = z.object({
    name: z.string({ required_error: "Name is required" }).max(20).min(3),
    email: z.string({ required_error: "Email is required" }).email(),
    image: z.string({ required_error: "Image are required " }).optional(),
    password: z.string({ required_error: "password is required" }).min(6)
})

const ermailVerifyValidation = z.object({
    otp: z.string({ required_error: "Otp required " }).max(6)
})

const getEmail = z.object({
    email: z.string({ required_error: "email is required" }).email()
})

const loginUserValidation = z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6)
})

const resetUserPassword = z
    .object({
        otp: z.string({ required_error: "otp is required" }).max(6),
        password: z.string({ required_error: "password is required" }).min(6),
        confirmPassword: z.string({ required_error: "confirm password is required" }).min(6)
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match"
    })

export { createUserValidation, ermailVerifyValidation, getEmail, loginUserValidation, resetUserPassword }
