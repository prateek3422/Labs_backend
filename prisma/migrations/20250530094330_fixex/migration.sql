/*
  Warnings:

  - You are about to drop the column `isWinner` on the `ContestParticipation` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `ContestParticipation` table. All the data in the column will be lost.
  - You are about to drop the column `problemsId` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the column `problemsolvedId` on the `UserActivity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,problemId]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `problemId` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_problemsId_fkey";

-- AlterTable
ALTER TABLE "ContestParticipation" DROP COLUMN "isWinner",
DROP COLUMN "score";

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "problemsId",
DROP COLUMN "problemsolvedId",
ADD COLUMN     "problemId" UUID NOT NULL,
ADD COLUMN     "problemSolvedId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_userId_problemId_key" ON "UserActivity"("userId", "problemId");

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_problemSolvedId_fkey" FOREIGN KEY ("problemSolvedId") REFERENCES "ProblemSolved"("id") ON DELETE SET NULL ON UPDATE CASCADE;
