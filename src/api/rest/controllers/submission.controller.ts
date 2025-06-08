import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { executeValidation } from "../validation";
import { HttpError } from "../configs";
import { submissionService } from "@/services/submission.service";

class SubmissionController {
    createSubmission = async (request:AppRequest, response: AppResponse, next: AppNextFunction) => {
        const {data, error} = executeValidation.safeParse(request.body);

        if(error){
            return next(new HttpError(error?.issues[0]?.message, 400))
        }
        const userId = request.user?.id

        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        const result = await submissionService.submitCodeService({
            ...data,
            userId,
        });

        if(result.statusCode === 201){
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else{
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }

    }

    getAllSubmissions = async (request:AppRequest, response: AppResponse, next: AppNextFunction) => {
        const userId = request.user?.id

        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        const result = await submissionService.getAllSubmissionsService(userId);

        if(result.statusCode === 200){
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else{
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }
    }

    getSubmissionByproblemId = async (request:AppRequest, response: AppResponse, next: AppNextFunction) => {
        const userId = request.user?.id
        const problemId = request.params.problemId

        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        if (!problemId) {
            return next(new HttpError("Problem id not found", 404))
        }

        const result = await submissionService.getSubmissionByProblemIdService(userId, problemId);

        if(result.statusCode === 200){
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else{
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }
    }

    getSubmissionCount = async (request:AppRequest, response: AppResponse, next: AppNextFunction) => {
        const problemId = request.params.problemId

        if (!problemId) {
            return next(new HttpError("Problem id not found", 404))
        }

        const result = await submissionService.getSubmissionCountService(problemId);

        if(result.statusCode === 200){
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else{
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }
    }

    getSolvedProblem = async (request:AppRequest, response: AppResponse, next: AppNextFunction) => {
        const userId = request.user?.id
        const problemId = request.params.problemId

        if (!userId) {
            return next(new HttpError("User not found", 404))
        }

        if (!problemId) {
            return next(new HttpError("Problem id not found", 404))
        }
        const result = await submissionService.getSolvedProblemService(userId, problemId);

        if(result.statusCode === 200){
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else{
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }
    }
    getAllSub = async (request:AppRequest, response: AppResponse, next: AppNextFunction) => {
        const userId = request.user?.id
        if (!userId) {
            return next(new HttpError("User not found", 404))
        }
        const result = await submissionService.getAllSubmissionService();

        if(result.statusCode === 200){
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        }else{
            return next(new HttpError(result.error || "something went wrong", result.statusCode))
        }
    }
}


export const submissionController = new SubmissionController()