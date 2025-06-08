import { upvoteRepo } from "@/repositories/queries/upvote";
import { TUpvoteComunity } from "@/types/repositories/upvote";

class UpvodeService {
    toggleUpvoteComunity = async (data: TUpvoteComunity) => {
        const isAlreadyUpvoted = await upvoteRepo.toggleUpvoteComunity({
            userId: data.userId,
            comunityId: data.comunityId,
            isVote: data.isVote
        });

        if (!isAlreadyUpvoted) {
            return {
                statusCode: 400,
                error: "Upvote not created",
            };
        }

        return {
            statusCode: 200,
            message: "Upvote created successfully",
            data: isAlreadyUpvoted,
        };
    }

}

export const upvoteService = new UpvodeService();