/*
  Warnings:

  - You are about to drop the column `commentId` on the `ComunityUpvote` table. All the data in the column will be lost.
  - You are about to drop the column `downvote` on the `ComunityUpvote` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `ComunityUpvote` table. All the data in the column will be lost.
  - You are about to drop the column `activity` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `UserActivity` table. All the data in the column will be lost.
  - The `image` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `isVote` to the `ComunityUpvote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ComunityUpvote" DROP CONSTRAINT "ComunityUpvote_commentId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_problemId_fkey";

-- DropIndex
DROP INDEX "ComunityUpvote_commentId_userId_key";

-- DropIndex
DROP INDEX "UserActivity_userId_problemId_key";

-- AlterTable
ALTER TABLE "ComunityUpvote" DROP COLUMN "commentId",
DROP COLUMN "downvote",
DROP COLUMN "upvote",
ADD COLUMN     "isVote" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Problems" ADD COLUMN     "isContestProblem" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "activity",
DROP COLUMN "problemId",
ADD COLUMN     "problemsId" UUID,
ADD COLUMN     "problemsolvedId" UUID[];

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "LoginType" TEXT NOT NULL DEFAULT 'email',
DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- CreateTable
CREATE TABLE "Contest" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "problemIds" UUID[],
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestParticipation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "contestId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" UUID NOT NULL,
    "contestId" UUID NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LeaderBoardToUsers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_LeaderBoardToUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContestParticipation_userId_contestId_key" ON "ContestParticipation"("userId", "contestId");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderBoard_contestId_key" ON "LeaderBoard"("contestId");

-- CreateIndex
CREATE INDEX "_LeaderBoardToUsers_B_index" ON "_LeaderBoardToUsers"("B");

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_problemsId_fkey" FOREIGN KEY ("problemsId") REFERENCES "Problems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipation" ADD CONSTRAINT "ContestParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipation" ADD CONSTRAINT "ContestParticipation_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaderBoardToUsers" ADD CONSTRAINT "_LeaderBoardToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "LeaderBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaderBoardToUsers" ADD CONSTRAINT "_LeaderBoardToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
