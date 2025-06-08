export type TUpvoteComunity = {
    userId: string;
    comunityId: string;
    isVote: boolean;
}

export type TDownvoteComunity = {
    userId: string;
    comunityId: string;
    downvote: boolean;
}

export type TUpvoteComment = {
    comunityId: string;
    userId: string;
    commentId: string;
    isVote: boolean;
}


export interface IUpvoteComunityRepo {
    toggleUpvoteComunity: (data: TUpvoteComunity) => Promise<null | TUpvoteComunity>
    getUpvoteComunity: (data: TUpvoteComunity) => Promise<null | TUpvoteComunity>
    getCommentUpvote: (data: TUpvoteComment) => Promise<null | TUpvoteComment>
    // toggleUpvoteComment: (data: TUpvoteComment) => Promise<null | TUpvoteComment>
}