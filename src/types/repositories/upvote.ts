export type TUpvoteComunity = {
    userId: string;
    comunityId: string;
    upvote: number;
}

export type TDownvoteComunity = {
    userId: string;
    comunityId: string;
    downvote: number;
}

export type TUpvoteComment = {
    userId: string;
    commentId: string;
    upvote: number;
}
export type TDownvoteComment = {
    userId: string;
    commentId: string;
    downvote: number;
}

export interface IUpvoteComunityRepo {
    toggleUpvoteComunity: (data: TUpvoteComunity) => Promise<null | TUpvoteComunity>
    getUpvoteComunity: (data: TUpvoteComunity) => Promise<null | TUpvoteComunity>
    toggleDownvoteComunity: (data: TDownvoteComunity) => Promise<null | TDownvoteComunity>
    getCommentUpvote: (data: TUpvoteComment) => Promise<null | TUpvoteComment>
    toggleUpvoteComment: (data: TUpvoteComment) => Promise<null | TUpvoteComment>
    toggleDownvoteComment: (data: TDownvoteComment) => Promise<null | TDownvoteComment>
}