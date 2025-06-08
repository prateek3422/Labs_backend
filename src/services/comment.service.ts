import { commentRepo } from "@/repositories/queries/comment";
import { TComment, TGetComment, TUpdateComment } from "@/types/repositories/comment";

class CommentService {
    async createComment (data: TComment) {        
        const comment = await commentRepo.createComment(data);

        if (!comment) {
            return {
                statusCode: 400,
                error: "Comment not created",
            }
        }

        return {
            statusCode: 201,
            message: "Comment created successfully",
            data: comment
        }
    }

    async getAllComments (data: TGetComment) {
        const comments = await commentRepo.getAllComments(data);

        if (!comments) {
            return {
                statusCode: 500,
                error: "Comments not found",
            }
        }

        return {
            statusCode: 200,
            message: "Comments found successfully",
            data: comments
        }
    }
    async updateComment (data: TUpdateComment) {
        const comment = await commentRepo.updateComment(data);

        if (!comment) {
            return {
                statusCode: 500,
                error: "Comment not updated",
            }
        }

        return {
            statusCode: 200,
            message: "Comment updated successfully",
            data: comment
        }
    }

    async deleteComment (data: {
        commentId: string;
    }) {

     await commentRepo.deleteComment({ commentId: data.commentId });

        return {
            statusCode: 200,
            message: "Comment deleted successfully",
            data: null
        }
    }
}


export const commentService = new CommentService();