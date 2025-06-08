import { AppNextFunction, AppRequest, AppResponse } from "@/types"
import { HttpError } from "../configs"
import { tokenUtilities } from "@/utils/tokenUtile"
import { myEnvironment } from "@/configs"

export const TokenMiddleWare = (request: AppRequest, response: AppResponse, next: AppNextFunction) => {

        const authHeader = request.header?.("authorization")
        const cookieToken = request?.cookies?.token as string | undefined
        const token = authHeader?.split(" ")[1] || cookieToken

        if (!token) {
            return next(new HttpError("unauthorized | token not found", 401))
        }

        const decodedToken = tokenUtilities.verify(token, myEnvironment.TOKEN)

        if (!decodedToken) {
            next(new HttpError("invalid token", 401))
        }

        request.tokenData = decodedToken as object
        request.token = token
        return next()

}
