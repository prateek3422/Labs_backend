export type TParticipant = {
    id?: string;
    userId: string;
    contestId: string;
    score: number;
    iswinner: boolean;
    isDisqualified: boolean;
}


export interface IParticipantRepo {
    createParticipant(data: TParticipant): Promise<null | TParticipant>;
    getParticipantsByContestId(contestId: string): Promise<null | TParticipant[]>;
    getParticipantById(id: string): Promise<null | TParticipant>;
    updateParticipantScore(id: string, score: number): Promise<null | TParticipant>;
    disqualifyParticipant(id: string): Promise<null | TParticipant>;
    removeParticipant(id: string): Promise<null | TParticipant>;
}