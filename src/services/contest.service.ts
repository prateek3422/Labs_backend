import { logger } from "@/configs";
import { contestRepo } from "@/repositories/queries/contest";
import { problemRepo } from "@/repositories/queries/problem";

import { TContest } from "@/types/repositories/contest";

class ContestService {
    async createcontest(data: TContest) {
        const contest = await contestRepo.createContest(data);
        if (data.problemIds && !Array.isArray(data.problemIds)) {
            return {
                statusCode: 400,
                error: "problemIds must be an array",
                data: null
            };
        }

        if (!contest) {
            return {
                statusCode: 500,
                error: "contest creation failed",
                data: null
            }
        }


        //!get problem by id and update isContest to true
        if (data.problemIds && data.problemIds.length > 0) {
            try {
                // Use Promise.all to wait for all problem updates
                const problemUpdatePromises = data.problemIds.map(async (problemId) => {
                    return problemRepo.updateProblemIsContestProblem({
                        id: problemId,
                        isContestProblem: true
                    });
                });

                const problemUpdates = await Promise.all(problemUpdatePromises);

                // Check if any updates failed
                const failedUpdates = problemUpdates.filter(update => !update);
                if (failedUpdates.length > 0) {
                    logger.warn(`Failed to update ${failedUpdates.length} problems for contest ${contest.id}`);
                }
            } catch (error) {
                logger.error("Error updating problems for contest:", error);
                // Continue execution but log the error
            }
        }
   
        return {
            statusCode: 201,
            message: "contest created successfully",
            data: contest
        }


    }

    async getContest() {
        const contests = await contestRepo.getContest();

        if (!contests) {
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


        if (!contest) {
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

        if (!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        const deletedContest = await contestRepo.deleteContest(id);

        if (!deletedContest) {
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

        if (!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        const updateCOntest = await contestRepo.updateContest(id, data);

        if (!updateCOntest) {
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
    async joinContest(data: { contestId: string; userId: string }) {

        const contest = await this.getContestById(data.contestId);

        if (!contest) {
            return {
                statusCode: 404,
                error: "contest not found",
                data: null
            }
        }

        if (contest?.data?.status !== "UPCOMING") {
            return {
                statusCode: 400,
                error: "this contest is not open for joining",
                data: null
            }
        }

        //Already joined contest
        const existingJoin = contest.data?.participants?.find(participant => participant.id === data.userId);

        if (existingJoin) {
            return {
                statusCode: 400,
                error: "you have already joined this contest",
                data: null
            }
        }
        const joinedContest = await contestRepo.joinContest(data);

        if (!joinedContest) {
            return {
                statusCode: 500,
                error: "failed to join contest",
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "contest joined successfully",
            data: joinedContest
        }
    }
    // async getActiveContests() {
    //     const contests = await contestRepo.getActiveContests();

    //     if(!contests) {
    //         return {
    //             statusCode: 500,
    //             error: "failed to fetch active contests",
    //             data: null
    //         }
    //     }

    //     return {
    //         statusCode: 200,
    //         message: "active contests fetched successfully",
    //         data: contests
    //     }
    // }

    // async toggleContestStatus(id: string) {
    //     const contest = await contestRepo.toggleContestStatus(id);

    //     if(!contest) {
    //         return {
    //             statusCode: 404,
    //             error: "contest not found",
    //             data: null
    //         }
    //     }

    //     return {
    //         statusCode: 200,
    //         message: `contest  successfully`,
    //         data: contest
    //     }

    // }
}


export const contestService = new ContestService();