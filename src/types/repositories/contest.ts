export type TContest ={
    id?: string;
    name: string;
    description: string;
    startTime: Date;
    isActive?: boolean;
    endTime: Date;
    problemIds: string[];
}


export interface IContestRepo {
    createContest(data: TContest): Promise<null | TContest>;
    getContest(): Promise<null | TContest[]>;
    getContestById(id: string): Promise<null | TContest>;
    deleteContest(id: string): Promise<null | TContest>;
    updateContest(id: string, data: Partial<TContest>): Promise<null | TContest>;
    getActiveContests(): Promise<null | TContest[]>;    
    toggleContestStatus(id: string): Promise<null | TContest>;
} 