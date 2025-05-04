import { AppNextFunction, AppRequest, AppResponse } from "@/types"
import { createUserValidation, ermailVerifyValidation, getEmail } from "../validation"
import { HttpError } from "../configs"
import { userService } from "@/services/user.service"

class UserController {
    CreateUser = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createUserValidation.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const result = await userService.createUserService(data)

        if (result.statusCode === 201) {
            response
                .cookie("token", result.token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                })
                .status(result.statusCode)
                .json({
                    statusCode: result.statusCode,
                    mesaage: result.message,
                    data: result.data
                })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    verifyEmail = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = ermailVerifyValidation.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const tokenData = request?.tokenData as {
            email: string
        }

        if (!tokenData) {
            return next(new HttpError("Invalid token", 400))
        }

        const result = await userService.verifyUserService({
            otp: data.otp,
            email: tokenData.email
        })

        if (result.statusCode === 200) {
            response.status(result.statusCode).clearCookie("token").json({
                statusCode: result.statusCode,
                mesaage: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    resendEmailVerify = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = getEmail.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const result = await userService.resendEmailService(data.email)

        if (result.statusCode === 200) {
            response.status(result.statusCode).clearCookie("token").json({
                statusCode: result.statusCode,
                mesaage: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    loginUser = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        

    }
}

export const userController = new UserController()
