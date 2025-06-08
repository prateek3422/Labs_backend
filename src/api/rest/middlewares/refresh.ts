/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { HttpError } from "../configs";
import { tokenUtilities } from "@/utils/tokenUtile";
import { myEnvironment } from "@/configs";

export const RefreshMiddleware = (
    request: AppRequest,
    _response: AppResponse,
    next: AppNextFunction
) => {
 
    const token =
        request.headers.authorization?.split(" ")[1] || request?.cookies?.RefreshToken;

    if (!token) {
        return next(new HttpError("unauthorized | token not found", 401));
    }

    const decoded = tokenUtilities.verify(token, myEnvironment?.REFRESH_TOKEN);

    if (!decoded) {
        return next(new HttpError("unauthorized | invalid token", 401));
    }

    request.tokenData = decoded as {
        id: string;
        email: string;
    }
    request.token = token;
    return next();
};