import { AppNextFunction, AppRequest, AppResponse } from "@/types";

import { HttpError } from "../configs";
import { createProblemValidation } from "../validation";
import { problemService } from "@/services/problem.service";


class ProblemController {
    createProblem = async (request: AppRequest, response: AppResponse, next:AppNextFunction) => {
        // const {data, error} = createProblemValidation.safeParse(request.body)
        // console.log("error", error?.issues)

        // if (error) {
        //     return next(new HttpError(error?.issues[0]?.message, 400))
        // }


        const { title, description, tags, difficulty, examples, constraints, testCases, codeSnippet, referenceSolution } = request.body

        const data = {
            title,
            description,
            tags,
            difficulty,
            examples,
            constraints,
            testCases,
            codeSnippet,
            referenceSolution
        }
        
        if(!data) {
            return next(new HttpError("Invalid data", 400))
        }

        const userId = request.user?.id
        if (!userId) {
            return next(new HttpError("User not found", 404))
        }
        const result =  await problemService.createProblemService(
            data, 
            userId
        )

        // console.log(result, "result")

        if (result.statusCode === 201) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data
            })
        } else {
            return next(new HttpError(result.error || "something went wrong on problem creating", result.statusCode))
        }
    }
}



export const problemController = new ProblemController();
