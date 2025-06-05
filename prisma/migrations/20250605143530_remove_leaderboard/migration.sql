/*
  Warnings:

  - You are about to drop the column `leaderBoardId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the `LeaderBoard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LeaderBoardToUsers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contestId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LeaderBoard" DROP CONSTRAINT "LeaderBoard_contestId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_leaderBoardId_fkey";

-- DropForeignKey
ALTER TABLE "_LeaderBoardToUsers" DROP CONSTRAINT "_LeaderBoardToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_LeaderBoardToUsers" DROP CONSTRAINT "_LeaderBoardToUsers_B_fkey";

-- DropIndex
DROP INDEX "Score_userId_leaderBoardId_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "leaderBoardId",
ADD COLUMN     "contestId" UUID NOT NULL;

-- DropTable
DROP TABLE "LeaderBoard";

-- DropTable
DROP TABLE "_LeaderBoardToUsers";

-- CreateIndex
CREATE UNIQUE INDEX "Score_userId_key" ON "Score"("userId");
