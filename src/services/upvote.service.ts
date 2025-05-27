// import { upvoteRepo } from "@/repositories/queries/upvote";
// import { TUpdateComunity } from "@/types/repositories/comunity";
// import { TUpvoteComunity } from "@/types/repositories/upvote";

class UpvodeService {
    // toggleUpvoteComunity = async (data: TUpvoteComunity) => {    
    //     const isAlreadyUpvoted = await upvoteRepo.getUpvoteComunity(data);

    //     if(!isAlreadyUpvoted) {
    //         return await upvoteRepo.toggleUpvoteComunity({
    //             userId: data.userId,
    //             comunityId: data.comunityId,
    //             upvote : 1    
    //         });
    //     }
    // }

}

export const  upvoteService = new UpvodeService();