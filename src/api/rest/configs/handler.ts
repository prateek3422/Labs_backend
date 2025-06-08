import { AppErrorRequestHandler, AppNextFunction, AppRequest, AppResponse } from "@/types"
import { HttpError } from "./httpError"
import { myEnvironment } from "@/configs"
import { ZodError } from "zod"
import { JsonWebTokenError } from "jsonwebtoken"

//Type for async handler
type AsyncHandler = (request: AppRequest, response: AppResponse, next: AppNextFunction) => Promise<unknown>

export const AsyncErrorHandler = (function_: AsyncHandler) => {
    return (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        try {
            const result = function_(request, response, next)
            if (result instanceof Promise) {
                result.catch(next)
            }
        } catch (error) {
            next(error)
        }
    }
}

export const globalErrorHandler: AppErrorRequestHandler = (
    error: HttpError | Error,
    _request: AppRequest,
    response: AppResponse,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __: AppNextFunction
) => {
    let statusCode = 500
    let message = "Internal Server Error"

    // http error
    if (error instanceof HttpError) {
        statusCode = error.statusCode || 500
        message = error.message || "Internal Server Error"
    }

    // zod error
    if (error instanceof ZodError) {
        statusCode = 403
        message = error.issues[0].message
    }

    // json token error
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        statusCode = 401
        message = `Unauthorized | ${error.name === "TokenExpiredError" ? "Token expired" : "Invalid token"}`
    }

    if(error instanceof JsonWebTokenError ){
        statusCode = 401
        message = `Unauthorized | Invalid token`  
    }
    const responseBody = {
        statusCode,
        status: statusCode >= 400 && statusCode < 600 ? "error" : "success",
        message,
        ...(myEnvironment.NODE_ENV === "development" && {
            error: error instanceof HttpError ? error.error : error,
            stack: error.stack
        })
    }

    response.status(statusCode).json(responseBody)
    return
}

export const notFoundHandler = (request: AppRequest, _response: AppResponse, next: AppNextFunction): void => {
    const error = new HttpError(`Route not found: ${request.method} ${request.originalUrl}`, 404)
    return next(error)
}
