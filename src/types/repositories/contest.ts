import { Users } from "@prisma/client";

export type TContest ={
    id?: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    status?: "UPCOMING" | "LIVE" | "ENDED";
    problemIds: string[];
    participants?: Users[];
}


export type TJoinedContest = {
    contestId: string;
    userId: string;
}


export interface IContestRepo {
    createContest(data: TContest): Promise<null | TContest>;
    getContest(): Promise<null | TContest[]>;
    getContestById(id: string): Promise<null | TContest>;
    deleteContest(id: string): Promise<null | TContest>;
    updateContest(id: string, data: TContest): Promise<null | TContest>;
    // getActiveContests(): Promise<null | TContest[]>;    
    // toggleContestStatus(id: string): Promise<null | TContest>;
    joinContest(data: TJoinedContest): Promise<null | TJoinedContest>;
} 