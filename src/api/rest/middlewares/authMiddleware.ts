/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppNextFunction, AppRequest, AppResponse } from "@/types"

import { HttpError } from "../configs"
import { tokenUtilities } from "@/utils/tokenUtile"
import { myEnvironment } from "@/configs"

export const authMiddleware =  (request: AppRequest, _response: AppResponse, next: AppNextFunction) => {
    const token = request.header("authorization")?.split(" ")[1] || request?.cookies?.AccessToken

    if (!token) {
        next(new HttpError("unauthorized | token not found", 401))
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const decodedToken = tokenUtilities.verify(token, myEnvironment.ACCESS_TOKEN)

    if (!decodedToken) {
        next(new HttpError("invalid token", 401))
    }


    request.user = decodedToken as {
        id: string
        name: string
        email: string
        role: string
    }

    return next()
}
