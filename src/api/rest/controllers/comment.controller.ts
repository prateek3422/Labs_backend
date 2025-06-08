import { AppNextFunction, AppRequest, AppResponse } from "@/types"
import { createCommentValidation, deleteCommentValidation, updateCommentValidation } from "../validation"
import { HttpError } from "../configs";
import { commentService } from "@/services/comment.service";


class CommentController {
    createComment = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = createCommentValidation.safeParse(request.body);
        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const userId = request.user?.id

        if (!userId) {
            return next(new HttpError("User not found", 404));
        }

        const comment = await commentService.createComment({
            comment: data.comment,
            userId,
            comunityId: data.comunityId,
        });

        return comment.statusCode === 201 ? response.status(comment.statusCode).json({
                message: comment.message,
                data: comment.data
            }) : next(new HttpError(comment.error || "somthing went wrong on comment", comment.statusCode));

    }
    getAllComments = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { page, limit, query, sort, sortBy } = request.query;

        const comments = await commentService.getAllComments({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            query: query as string,
            sort: sort as string,
            sortBy: sortBy as string,
        });

        return comments.statusCode === 200 ? response.status(comments.statusCode).json({
                message: comments.message,
                data: comments.data
            }) : next(new HttpError(comments.error || "somthing went wrong on comment", comments.statusCode));
    }

    updateComment = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        
        const { data, error } = updateCommentValidation.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const comment = await commentService.updateComment({
            id: data.commentId,
            comment: data.comment,
        });

        return comment.statusCode === 200 ? response.status(comment.statusCode).json({
                message: comment.message,
                data: comment.data
            }) : next(new HttpError(comment.error || "somthing went wrong on comment", comment.statusCode));
    }

    deleteComment = async (request: AppRequest, response: AppResponse, next: AppNextFunction) => {
        const { data, error } = deleteCommentValidation.safeParse(request.body);

        if (error) {
            return next(new HttpError(error.issues[0].message, 400));
        }

        const comment = await commentService.deleteComment(data);

        return comment.statusCode === 200 ? response.status(comment.statusCode).json({
                message: comment.message,
                data: comment.data
            }) : next(new HttpError( "somthing went wrong on comment", comment.statusCode));
    }

}


export const commentController = new CommentController()