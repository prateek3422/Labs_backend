import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { createContestValidation } from "../validation";
import { HttpError } from "../configs";
import { contestService } from "@/services/contest.service";

class ContestController {
    createContest = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createContestValidation.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const result = await contestService.createcontest(data);

        return result.statusCode === 201
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while creating contest", result.statusCode));
    }

    getContest = async (_request: AppRequest, response: AppResponse, next: AppNextFunction) => {

        const result = await contestService.getContest();

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while fetching contests", result.statusCode));
    }

    getContestById = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params;

        if (!id) {
            return next(new HttpError("Contest ID is required", 400));
        }

        const result = await contestService.getContestById(id);

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while fetching contest", result.statusCode));
    }

    deleteContest = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params;

        if (!id) {
            return next(new HttpError("Contest ID is required", 400));
        }

        const result = await contestService.deleteContest(id);

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while deleting contest", result.statusCode));
    }

    updateContest = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params;
        const { data, error } = createContestValidation.safeParse(request.body);

        if (!id) {
            return next(new HttpError("Contest ID is required", 400));
        }

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const result = await contestService.updateContest(id, data);

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while updating contest", result.statusCode));
    }

    getActiveContests = async (_request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const result = await contestService.getActiveContests();

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while fetching active contests", result.statusCode));
    }

    toggleContestStatus = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params;

        if (!id) {
            return next(new HttpError("Contest ID is required", 400));
        }

        const result = await contestService.toggleContestStatus(id);

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while toggling contest status", result.statusCode));
    }
}


export const contestController = new ContestController();