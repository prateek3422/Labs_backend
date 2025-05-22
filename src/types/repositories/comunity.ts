export type TComunity = {
    id?: string;
    title: string;
    content: string;
    image?: string;
    tags: string[];
    userId: string; 
    view: number;
}

export type TGetComunity = {
    page: number;
    limit: number;
    query?: string;
    sort?: string;
    sortBy?: string;
    user?: string;
}

export type TUpdateComunity = {
    id: string;
    title?: string;
    content?: string;
    image?: string;
    tags?: string[];
    view?: number;
}


export interface IComunityRepo {
    createComunity(data: TComunity): Promise<null | TComunity>;
    getComunityById(id: string): Promise<TComunity | null>;
    getAllComunities(data: TGetComunity): Promise<null | TComunity[]>;
    updateComunity(data: TUpdateComunity): Promise<null | TUpdateComunity>;
    deleteComunity(id: string): Promise<null>;
}