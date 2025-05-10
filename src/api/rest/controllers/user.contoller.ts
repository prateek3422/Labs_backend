import { AppNextFunction, AppRequest, AppResponse } from "@/types"
import { createUserValidation, ermailVerifyValidation, getEmail, loginUserValidation, resetUserPassword } from "../validation"
import { HttpError } from "../configs"
import { userService } from "@/services/user.service"
import { myEnvironment } from "@/configs"



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
        const { data, error } = loginUserValidation.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }
        const result = await userService.loginUserService({
            email: data.email,
            password: data.password
        })

        if (result.statusCode === 200) {
            response
                .status(result.statusCode)
                .cookie("AccessToken", result?.data?.AccessToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                })
                .cookie("RefreshToken", result?.data?.RefreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                })
                .json({
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data
                })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    logOutUser = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const id = request.user?.id

        if (!id) {
            return next(new HttpError("Email is required for logout", 400))
        }

        const result = await userService.logoutUSerService(id)

        if(result.statusCode === 200){
            response.status(result.statusCode).clearCookie("AccessToken").clearCookie("RefreshToken").json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
        }else{
         return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    getuser = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const id = request.user?.id

        if (!id) {
            return next(new HttpError("Email is required for logout", 400))
        }

        const result = await userService.getUserService(id)

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    getAllUser = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const result = await userService.getAllUserService()

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }


    refreshToken = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const token  = request.cookies as {
            RefreshToken: string
        }

        if(!token){
            return next(new HttpError("Refresh token is required", 400))
        }

        const result = await userService.refreshTokenService(token.RefreshToken)

        if (result.statusCode === 200) {
            response
                .status(result.statusCode)
                .cookie("AccessToken", result?.data?.AccessToken, {
                    httpOnly: true,
                    sameSite: myEnvironment.NODE_ENV === "development" ? "lax" : "none",
                    secure: true
                })
                .cookie("RefreshToken", result?.data?.RefreshToken, {
                    httpOnly: true,
                    sameSite: myEnvironment.NODE_ENV === "development" ? "lax" : "none",
                    secure: true
                })
                .json({
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data
                })
        }else{
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    forgotPassword = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = getEmail.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const result = await userService.forgotPasswordService(data.email)

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                statusCode: result.statusCode,
                mesaage: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }

    resetPassword = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = resetUserPassword.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const tokenData = request?.tokenData as {
            email: string
        }
        if(!tokenData) {
            return next(new HttpError("Invalid token", 400))
        }
        const result = await userService.resetPasswordService({
            email: tokenData.email,
            password: data.password,
        })

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                statusCode: result.statusCode,
                mesaage: result.message,
                data: result.data
            })
        }
        else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }

    }



}

export const userController = new UserController()
