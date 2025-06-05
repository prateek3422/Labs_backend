import { AppNextFunction, AppRequest, AppResponse } from "@/types";

import { HttpError } from "../configs";
import { createProblemValidation } from "../validation";
import { problemService } from "@/services/problem.service";


class ProblemController {
    createProblem = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createProblemValidation.safeParse(request.body)

        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        const userId = request.user?.id
        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

      
        const result = await problemService.createProblemService({ ...data, userId })


        if (result.statusCode === 201) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on problem creating", result.statusCode))
        }
    }

    getAllProblems = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const {page="1", limit="10", query, difficulty, tags, sortBy, sortOrder} = request.query
        
        const result = await problemService.getAllProblemsService({
            page: Number(page),
            limit: Number(limit),
            query: query as string,
            tags: tags as string[],
            difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
            sort:{
                field: sortBy as string,
                order: sortOrder as "asc" | "desc"
            }

        })



        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on getting all problems", result.statusCode))
        }
    }

    getProblemById = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params

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

    updateProblem = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params

        const { data, error } = createProblemValidation.safeParse(request.body)

        const userId = request.user?.id
        if (!userId) {
            return next(new HttpError("User not found", 404))
        }


        if (error) {
            return next(new HttpError(error?.issues[0]?.message, 400))
        }

        if (!id) {
            return next(new HttpError("Problem id is required", 400))
        }
        const result = await problemService.updateProblemService({
            ...data,
            userId,
            id
        })


        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on updating problem", result.statusCode))
        }


    }

    deleteProblem = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params


        if (!id) {
            return next(new HttpError("Problem id is required", 400))
        }

        const result = await problemService.deleteProblemService(id)

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on deleting problem", result.statusCode))
        }
    }

    getAllProblemsSolvedByUser = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const userId = request.user?.id

        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        const result = await problemService.getAllProblemsSolvedByUserService(userId)

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on getting all problems solved by user", result.statusCode))
        }
    }
}



export const problemController = new ProblemController();
