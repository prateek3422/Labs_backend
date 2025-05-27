import { AppNextFunction, AppRequest, AppResponse } from "@/types";
import { HttpError } from "../configs";
import { profileService } from "@/services/profile.service";

class ProfileController {
    uploadProfilePicture = async (request: AppRequest, response:AppResponse, next:AppNextFunction) =>{
        const files = request.file as Express.Multer.File;

        if (!files) {
            return next(new HttpError("Please upload a file", 400));
        }

        const userId = request.user?.id;
        if (!userId) {
            return next(new HttpError("User not found", 400));
        }

        const result = await profileService.uploadProfilePicture({ files, userId});

        return result.statusCode === 200 ? response.status(result.statusCode).json({
                statusCode: result.statusCode,
                message: result.message,
                data: result.data
            }) : next(new HttpError(result.error || "Something went wrong while uploading profile picture", result.statusCode));
    }
}


export const profileController = new ProfileController();