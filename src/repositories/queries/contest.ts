import { asyncHandler } from "@/configs/handler";
import { IContestRepo, TContest } from "@/types/repositories/contest";
import { prisma } from "../database";

class ContestRepo implements IContestRepo{
    async createContest(data: TContest) {

        //@ts-expect-error accepting string as date
        const {data:contest, error} = await asyncHandler(prisma.contest.create({data}))

        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }

    async getContest() {
        const {data: contests, error} = await asyncHandler(prisma.contest.findMany(
            {
                include:{
                    participants: true, 

                }
            }
        ))

        if (error) {
            return null;
        }
        return contests as unknown as TContest[];
    }
    async getContestById(id: string) {
        const {data: contest, error} = await asyncHandler(prisma.contest.findUnique({
            where: {
                id:id
            },
            include: {
                participants: true, 
            }
        }))

        // console.log(contest)
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
            //@ts-expect-error accepting string as date
            data: data
        }))

        if (error) {
            return null;
        }
        return contest as unknown as TContest;
    }


    async joinContest(data: { contestId: string; userId: string }) {

     

        const {data: joinedContest, error} = await asyncHandler(prisma.contest.update({
        where:{
            id: data.contestId
        },
        data:{

            participants: {
                connect:{
                    id: data?.userId
                }
            }
        }
        }))

   
        if (error) {
            
            return null;
        }
        return joinedContest as unknown as { contestId: string; userId: string };
    }
 


}


export const contestRepo = new ContestRepo();