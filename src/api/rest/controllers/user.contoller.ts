import { AppNextFunction, AppRequest, AppResponse } from "@/types"
import { createUserValidation } from "../validation"
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
            response.status(result.statusCode).json({
                statusCode: result.statusCode,
                mesaage: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on user creating", result.statusCode))
        }
    }
}

export const userController = new UserController()
