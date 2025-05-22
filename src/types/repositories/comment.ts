export type TComment = {
    id?: string;
    comment: string;
    userId: string;
    comunityId: string;
}

export type TGetComment = {
    page: number;
    limit: number;
    query?: string;
    sort?: string;
    sortBy?: string;
}

export type TUpdateComment = {
    id: string
    comment: string;
}

export interface ICommentRepo {
    createComment(data: TComment): Promise<null | TComment>;
    getAllComments(data: TGetComment): Promise<null | TComment[]>;
    updateComment(data: TUpdateComment): Promise<null | TUpdateComment>;
    deleteComment(id: string): Promise<null>;
}

