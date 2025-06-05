/*
  Warnings:

  - You are about to drop the column `score` on the `LeaderBoard` table. All the data in the column will be lost.
  - You are about to drop the `ContestParticipation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContestParticipation" DROP CONSTRAINT "ContestParticipation_contestId_fkey";

-- DropForeignKey
ALTER TABLE "ContestParticipation" DROP CONSTRAINT "ContestParticipation_userId_fkey";

-- AlterTable
ALTER TABLE "LeaderBoard" DROP COLUMN "score";

-- DropTable
DROP TABLE "ContestParticipation";

-- CreateTable
CREATE TABLE "Score" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "leaderBoardId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContestToUsers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ContestToUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContestToUsers_B_index" ON "_ContestToUsers"("B");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContestToUsers" ADD CONSTRAINT "_ContestToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Contest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContestToUsers" ADD CONSTRAINT "_ContestToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
