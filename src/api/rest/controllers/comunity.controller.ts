import { createComunityValidation, updateComunityValidation } from "../validation";
import { comunityService } from "@/services/comunity.service";
import { HttpError } from "../configs";
import { AppRequest, AppResponse, AppNextFunction } from "@/types";

class ComunityController {
    createComunity = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createComunityValidation.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const userId = request.user?.id

        if (!userId) {
            return response.status(401).json({
                message: "Unauthorized",
            });
        }

        const comunity = await comunityService.createComunity({
            ...data,
            userId,
        })

        if (comunity.sourceCode == 201) {
            response.status(comunity.sourceCode).json({
                message: comunity.message,
                error: comunity.data,
            });
        } else {
            return next(new HttpError(comunity.error || "somthig went wrong", comunity.sourceCode));
        }
    }

    getAllComunity = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { page = 1, limit = 10, query, sort, sortBy } = request.query;
        const { user } = request.params



        const Page = Number.parseInt(page as string);
        const Limit = Number.parseInt(limit as string);
        const Querry = query as string || "";
        const Sort = sort as string || "createdAt";
        const SortBy = sortBy as string || "desc";

        const comunities = await comunityService.getAllComunities({
            page: Page,
            limit: Limit,
            query: Querry,
            sort: Sort,
            sortBy: SortBy,
            user: user || undefined
        })

        if (comunities.sourceCode == 200) {
            response.status(comunities.sourceCode).json({
                message: comunities.message,
                data: comunities.data,
            })
        }
        else {
            return next(new HttpError(comunities.error || "somthig went wrong", comunities.sourceCode));
        }
    }
    getComunityById = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params
        const userId = request.user?.id 
 
        const comunity = await comunityService.getComunityById({ id, userId: userId })

        if (comunity.sourceCode == 200) {
            response.status(comunity.sourceCode).json({
                message: comunity.message,
                data: comunity.data,
            })
        }
        else {
            return next(new HttpError(comunity.error || "somthig went wrong", comunity.sourceCode));
        }
    }
    updateComunity = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params
        const { data, error } = updateComunityValidation.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const comunity = await comunityService.updateComunity({
            ...data,
            id
        })

        if (comunity.sourceCode == 200) {
            response.status(comunity.sourceCode).json({
                message: comunity.message,
                data: comunity.data,
            })
        }
        else {
            return next(new HttpError(comunity.error || "somthig went wrong", comunity.sourceCode));
        }
    }
    deleteComunity = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { id } = request.params

        const comunity = await comunityService.deleteComunity(id)

        if (comunity.sourceCode == 200) {
            response.status(comunity.sourceCode).json({
                message: comunity.message,
                data: comunity.data,
            })
        }
        else {
            return next(new HttpError(comunity.error || "somthig went wrong", comunity.sourceCode));
        }
    }

    // getComunityByUserId = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
    //     const { id } = request.params

    //     const comunity = await comunityService.getComunityByUserId(id)

    //     if (comunity.sourceCode == 200) {
    //         response.status(comunity.sourceCode).json({
    //             message: comunity.message,
    //             data: comunity.data,
    //         })
    //     }
    //     else {
    //         return next(new HttpError(comunity.error || "somthig went wrong", comunity.sourceCode));
    //     }
    // }

}


export const comunityController = new ComunityController();