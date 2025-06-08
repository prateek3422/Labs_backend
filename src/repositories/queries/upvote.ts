import { IUpvoteComunityRepo, TUpvoteComment, TUpvoteComunity } from "@/types/repositories/upvote";
import { prisma } from "../database";
import { asyncHandler } from "@/configs/handler";

class UpvoteRepo implements IUpvoteComunityRepo {
    async toggleUpvoteComunity(data: TUpvoteComunity) {
        const { data: comunity, error } = await asyncHandler(
            prisma.comunityUpvote.upsert({
                where: {
                    comunityId_userId: {
                        userId: data.userId,
                        comunityId: data.comunityId
                    }
                },
                update: {
                    userId:"",
                    comunityId: "",
                    isVote: false
                },
                create: {
                    userId: data.userId,
                    comunityId: data.comunityId,
                    isVote: data.isVote
                }
              
            })
        )
        if (error) {
            return null
        }
        return comunity as unknown as TUpvoteComunity
    }
    async getUpvoteComunity(data: TUpvoteComunity) {
        const { data: comunity, error } = await asyncHandler(
            prisma.comunityUpvote.findFirst({
                where: {
                    userId: data.userId,
                    comunityId: data.comunityId
                }
            })
        )
        if (error) {
            return null
        }
        return comunity as unknown as TUpvoteComunity
    }

    // async toggleUpvoteComment(data: TUpvoteComment) {
    //     const { data: comment, error } = await asyncHandler(
    //         prisma.comunityUpvote.create({
    //             data: {
    //                 userId: data.userId,
    //                 comunityId: data.comunityId,
    //                 upvote: data.upvote
    //             }
    //         })
    //     )
    //     if (error) {
    //         return null
    //     }
    //     return comment as unknown as TUpvoteComment
    // }

    async getCommentUpvote(data: TUpvoteComment) {
        const { data: comment, error } = await asyncHandler(
            prisma.comunityUpvote.findFirst({
                where: {
                    userId: data.userId,

                }
            })
        )
        if (error) {
            return null
        }
        return comment as unknown as TUpvoteComment
    }


}

export const upvoteRepo = new UpvoteRepo();