import { logger } from "@/configs";
import { contestRepo } from "@/repositories/queries/contest";
import nodeCron from "node-cron"

function StartCron({
    startTime,
    contestId

}: {
    startTime: Date,
    contestId: string
}) {

    nodeCron.schedule(
        `0 ${startTime.getMinutes()} ${startTime.getHours()} ${startTime.getDate()} ${startTime.getMonth() + 1} *`,
        async () => {
            try {

                const currentTime = new Date();
                const contestStartTime = new Date(startTime);
                if (currentTime >= contestStartTime) {
                    const updateContestStatus = await contestRepo.updateContest(
                        contestId,
                        { status: "LIVE" }
                    );

                    if (!updateContestStatus) {
                        logger.error("Failed to update contest status to LIVE");
                        return;
                    }

                    StopCron({
                        endTime: new Date(updateContestStatus.endTime.toString()),
                        contestId: contestId
                    })
                } else {
                    logger.info(`Contest creation time has not yet arrived`);
                }


            } catch (error) {
                logger.error("Error in cron job:", error);

            }
        },
        {
            timezone: "Asia/Kolkata"
        }
    );
}

function StopCron(
    {
        endTime,
        contestId
    }: {
        endTime: Date,
        contestId: string
    }
) {

    nodeCron.schedule(
        `0 ${endTime.getMinutes()} ${endTime.getHours()} ${endTime.getDate()} ${endTime.getMonth() + 1} *`,
        async () => {
            try {
                const currentTime = new Date();
                const contestEndTime = new Date(endTime);
                if (currentTime >= contestEndTime) {
                    // console.log(`Contest ${contestId} has ended at ${contestEndTime}`);

                    const updateContestStatus = await contestRepo.updateContest(
                        contestId,
                        { status: "ENDED" }
                    );

                    if (!updateContestStatus) {
                        logger.error("Failed to update contest status to ENDED");
                        return;
                    }



                } else {
                    logger.info(`Contest end time has not yet arrived`);
                }

            } catch (error) {
                logger.error("Error in cron job:", error);
            }
        },
        {
            timezone: "Asia/Kolkata"
        }
    );
 }


 export { StartCron, StopCron };