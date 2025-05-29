import { asyncHandler } from "@/configs/handler";
import { IParticipantRepo, TParticipant } from "@/types/repositories/participants";
import { prisma } from "../database";

class ParticipantRepo implements IParticipantRepo{
    async createParticipant(data: TParticipant) {
        const { data: participant, error } = await asyncHandler(prisma.contestParticipation.create({ data }));

            if (error) {
             
                return null;
            }

            return participant as unknown as TParticipant;
    }

    async getParticipantsByContestId(contestId: string) {
        const { data: participants, error } = await asyncHandler(prisma.contestParticipation.findMany({
            where: {
                contestId
            }
        }));

        if (error) {
            return null;
        }

        return participants as unknown as TParticipant[];
    }

    async getParticipantById(id: string) {
        const { data: participant, error } = await asyncHandler(prisma.contestParticipation.findUnique({
            where: {
                id
            }
        }));

        if (error) {
            return null;
        }

        return participant as unknown as TParticipant;
    }

    async updateParticipantScore(id: string, score: number) {
        const { data: participant, error } = await asyncHandler(prisma.contestParticipation.update({
            where: {
                id
            },
            data: {
                score
            }
        }));

        if (error) {
            return null;
        }

        return participant as unknown as TParticipant;
    }

    async disqualifyParticipant(id: string) {
        const { data: participant, error } = await asyncHandler(prisma.contestParticipation.update({
            where: {
                id
            },
            data: {
                isDisqualified: true
            }
        }));

        if (error) {
            return null;
        }

        return participant as unknown as TParticipant;
    }

    async removeParticipant(id: string) {
        const { data: participant, error } = await asyncHandler(prisma.contestParticipation.delete({
            where: {
                id
            }
        }));

        if (error) {
            return null;
        }

        return participant as unknown as TParticipant;
    }


}


export const participantRepo = new ParticipantRepo();