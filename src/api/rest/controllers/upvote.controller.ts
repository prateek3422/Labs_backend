import { upvoteService } from "@/services/upvote.service";
import { AppNextFunction, AppRequest, AppResponse } from "@/types";

class UpvoteController {
    ToggleUpvoteComunity = async (request:AppRequest, response:AppResponse, next:AppNextFunction ) =>{
        const { id } = request.params;
        const userId = request.user?.id;

        if (!userId) {
            return next(new Error("User ID not found in request"));
        }

        
        const result = await upvoteService.toggleUpvoteComunity({
            userId,
            comunityId: id,
            isVote:true
        });

        if (result.statusCode === 200) {
            response.status(result.statusCode).json({
                message: result.message,
                data: result.data,
            });
        } else {
            return next(new Error(result.error || "Something went wrong" + result.statusCode));
        }
    
    }

}

export const upvoteController = new UpvoteController();