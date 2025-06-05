/*
  Warnings:

  - A unique constraint covering the columns `[userId,contestId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Score_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Score_userId_contestId_key" ON "Score"("userId", "contestId");
