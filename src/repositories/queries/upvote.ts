// import { IUpvoteComunityRepo, TDownvoteComment, TDownvoteComunity, TUpvoteComment, TUpvoteComunity } from "@/types/repositories/upvote";
// import { prisma } from "../database";
// import { asyncHandler } from "@/configs/handler";

class UpvoteRepo  {
    // async toggleUpvoteComunity(data: TUpvoteComunity) {
    //     const { data: comunity, error } = await asyncHandler(
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
    //     return comunity as unknown as TUpvoteComunity
    // }
    // async getUpvoteComunity(data: TUpvoteComunity) {
    //     const { data: comunity, error } = await asyncHandler(
    //         prisma.comunityUpvote.findFirst({
    //             where: {
    //                 userId: data.userId,
    //                 comunityId: data.comunityId
    //             }
    //         })
    //     )
    //     if (error) {
    //         return null
    //     }
    //     return comunity as unknown as TUpvoteComunity
    // }

    // async toggleUpvoteComment(data: TUpvoteComment) {
    //     const { data: comment, error } = await asyncHandler(
    //         prisma.comunityUpvote.create({
    //             data: {
    //                 userId: data.userId,
    //                 commentId: data.commentId,
    //                 upvote: data.upvote
    //             }
    //         })
    //     )
    //     if (error) {
    //         return null
    //     }
    //     return comment as unknown as TUpvoteComment
    // }

    // async getCommentUpvote(data: TUpvoteComment) {
    //     const { data: comment, error } = await asyncHandler(
    //         prisma.comunityUpvote.findFirst({
    //             where: {
    //                 userId: data.userId,
    //                 commentId: data.commentId
    //             }
    //         })
    //     )
    //     if (error) {
    //         return null
    //     }
    //     return comment as unknown as TUpvoteComment
    // }
    // async toggleDownvoteComunity(data: TDownvoteComunity) {
    //     const { data: comunity, error } = await asyncHandler(
    //         prisma.comunityUpvote.create({
    //             //@ts-expect-error
    //             data: {
    //                 userId: data.userId,
    //                 comunityId: data.comunityId,
    //                 downvote: data.downvote
    //             }
    //         })
    //     )
    //     if (error) {
    //         return null
    //     }
    //     return comunity as unknown as TDownvoteComunity
    // }

    // async toggleDownvoteComment(data: TDownvoteComment) {
    //     const { data: comment, error } = await asyncHandler(
    //         prisma.comunityUpvote.create({
    //             //@ts-expect-error
    //             data: {
    //                 userId: data.userId,
    //                 commentId: data.commentId,
    //                 downvote: data.downvote
    //             }
    //         })
    //     )
    //     if (error) {
    //         return null
    //     }
    //     return comment as unknown as TDownvoteComment
    // }

}

export const upvoteRepo = new UpvoteRepo();