export type TScore = {

    userId : string
    timeTaken: number;
    score: number;
    contestId: string;    
}


export interface IScoreRepo {
    createScore(data: TScore): Promise<null | TScore>;

}