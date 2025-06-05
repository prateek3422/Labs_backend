import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { createContestValidation } from "../validation";
import { HttpError } from "../configs";
import { contestService } from "@/services/contest.service";
import { StartCron } from "@/utils";

class ContestController {
    createContest = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createContestValidation.safeParse(request.body);


        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const result = await contestService.createcontest(data);

        if (result.statusCode === 201 && result.data) {
            StartCron({
                contestId: result.data.id!,
                startTime: new Date(result.data.startTime.toString()),
            })
        }

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
        const { id } = request.params

  
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

    JoinContest = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params;
        const userId = request.user?.id as string

        if (!id) {
            return next(new HttpError("Contest ID is required", 400));
        }

        const result = await contestService.joinContest({ contestId: id, userId });

        return result.statusCode === 200
            ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            })
            : next(new HttpError(result.error || "Something went wrong while joining contest", result.statusCode));
    }
}


export const contestController = new ContestController();