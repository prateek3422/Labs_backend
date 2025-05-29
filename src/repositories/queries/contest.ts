import { asyncHandler } from "@/configs/handler";
import { IContestRepo, TContest } from "@/types/repositories/contest";
import { prisma } from "../database";

class ContestRepo implements IContestRepo{
    async createContest(data: TContest) {
        const {data:contest, error} = await asyncHandler(prisma.contest.create({data}))

        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }

    async getContest() {
        const {data: contests, error} = await asyncHandler(prisma.contest.findMany())

        if (error) {
            return null;
        }
        return contests as unknown as TContest[];
    }
    async getContestById(id: string) {
        const {data: contest, error} = await asyncHandler(prisma.contest.findUnique({
            where: {
                id
            }
        }))

        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }

    async deleteContest(id: string) {
        const {data: contest, error} = await asyncHandler(prisma.contest.delete({
            where: {
                id
            }
        }))

        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }

    async updateContest(id: string, data: Partial<TContest>) {
        const {data: contest, error} = await asyncHandler(prisma.contest.update({
            where: {
                id
            },
            data
        }))

        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }

    
    getActiveContests = async () => {
        const {data: contests, error} = await asyncHandler(prisma.contest.findMany({
            where: {
                isActive: true
            }
        }))

        if (error) {
            return null;
        }
        return contests as unknown as TContest[];
    }

    async toggleContestStatus(id: string) {
        const { data: currentContest, error: fetchError } = await asyncHandler(
            prisma.contest.findUnique({ where: { id } })
        );
        if (fetchError || !currentContest) {
            return null;
        }

        const { data: contest, error } = await asyncHandler(
            prisma.contest.update({
                where: { id },
                data: { isActive: !currentContest.isActive }
            })
        );
        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }


}


export const contestRepo = new ContestRepo();