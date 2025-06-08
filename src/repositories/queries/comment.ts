import { asyncHandler } from "@/configs/handler";
;
import { prisma } from "../database";
import { ICommentRepo, TComment, TGetComment, TUpdateComment } from "@/types/repositories/comment";

class CommentRepo implements ICommentRepo {
    async createComment(data: TComment) {
        const { data: comunity, error } = await asyncHandler(
            prisma.comunityComment.create({
                data: {
                    id: data.id,
                    comunityId: data.comunityId,
                    userId: data.userId,
                    comment: data.comment,
                }
            })
        )
        if (error) {
            return null
        }
        return comunity as unknown as TComment
    }


    async getAllComments(data: TGetComment) {
        const { data: comments, error } = await asyncHandler(prisma.comunityComment.findMany({
            skip: (data.page - 1) * data.limit,
            take: data.limit,
            where: {
                comment: {
                    contains: data.query,
                    mode: "insensitive"
                },
                
            },
            orderBy: {
                [data.sort || "createdAt"]: data.sortBy || "desc"
            }
        }))
        if (error) {
            return null
        }
        return comments as unknown as TComment[]
    }

    async updateComment(data: TUpdateComment) {
        const { data: comment, error } = await asyncHandler(prisma.comunityComment.update({
            where: {
                id: data.id
            },
            data
        }))
        if (error) {
            return null
        }
        return comment as unknown as TUpdateComment
    }

    async deleteComment(data: {
        commentId: string;
    }) {
        const { error } = await asyncHandler(prisma.comunityComment.delete({
            where: {
                id: data.commentId
            }
        }))
        if (error) {
            return null
        }
        return null
    }
}


export const commentRepo = new CommentRepo()