import { contestRepo } from "@/repositories/queries/contest";
import { TContest } from "@/types/repositories/contest";

class ContestService {
    async createcontest(data:TContest ) {
        const contest = await contestRepo.createContest(data);

        if(!contest) {
            return {
                statusCode: 500,
                error: "contest creation failed",
                data: null
            }
        }


        return {
            statusCode: 201,
            message: "contest created successfully",
            data: contest
        }


    }

    async getContest(){
        const contests = await contestRepo.getContest();

        if(!contests) {
            return {
                statusCode: 500,
                error: "failed to fetch contests",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "contests fetched successfully",
            data: contests
        }
    }

    async getContestById(id: string) {
        const contest = await contestRepo.getContestById(id);

        if(!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "contest fetched successfully",
            data: contest
        }
    }

    async deleteContest(id: string) {
        const contest = await contestRepo.getContestById(id);

        if(!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        const deletedContest = await contestRepo.deleteContest(id);

        if(!deletedContest) {
            return {
                statusCode: 500,
                error: "failed to delete contest",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "contest deleted successfully",
            data: deletedContest
        }
    }

    async updateContest(id: string, data: Partial<TContest>) {
        const contest = await contestRepo.getContestById(id);

        if(!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        const updateCOntest = await contestRepo.updateContest(id, data);

        if(!updateCOntest) {
            return {
                statusCode: 500,
                error: "failed to update contest",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "contest updated successfully",
            data: updateCOntest
        }
    }

    async getActiveContests() {
        const contests = await contestRepo.getActiveContests();

        if(!contests) {
            return {
                statusCode: 500,
                error: "failed to fetch active contests",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "active contests fetched successfully",
            data: contests
        }
    }

    async toggleContestStatus(id: string) {
        const contest = await contestRepo.toggleContestStatus(id);

        if(!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: `contest ${contest.isActive ? "activated" : "deactivated"} successfully`,
            data: contest
        }

    }
}


export const contestService = new ContestService();