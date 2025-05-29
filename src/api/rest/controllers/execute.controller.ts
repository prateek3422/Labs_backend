import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { executeValidation } from "../validation";
import { HttpError } from "../configs";
import { executeService } from "@/services/execute.service";

class ExecuteController {
    executeCode = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const {data , error} = executeValidation.safeParse(request.body)
        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const userId = request.user?.id

        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        const result = await executeService.executeCodeService({
            ...data,
            userId,
        })

        if(result.statusCode === 200){
             response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else {
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }
    }

}


export const executeController = new ExecuteController();