import { AppNextFunction, AppRequest, AppResponse } from "@/types";

import { HttpError } from "../configs";
import { createProblemValidation } from "../validation";
import { problemService } from "@/services/problem.service";


class ProblemController {
    createProblem = async (request: AppRequest, response: AppResponse, next:AppNextFunction) => {
        const {data, error} = createProblemValidation.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const userId = request.user?.id
        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        const result =  await problemService.createProblemService({ ...data, userId })
        

        if (result.statusCode === 201) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on problem creating", result.statusCode))
        }
    }

    getAllProblems = async ( _ :AppRequest,response: AppResponse, next:AppNextFunction) => {
        const result = await problemService.getAllProblemsService()

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on getting all problems", result.statusCode))
        }
    }

    getProblemById = async (request: AppRequest, response: AppResponse, next:AppNextFunction) => {
        const {id} = request.params

        if (!id) {
            return next(new HttpError("Problem id is required", 400))
        }

        const result = await problemService.getProblemByIdService(id)

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on getting problem by id", result.statusCode))
        }

    
    }
}



export const problemController = new ProblemController();
