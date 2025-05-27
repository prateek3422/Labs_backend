/*
  Warnings:

  - A unique constraint covering the columns `[comunityId,userId]` on the table `ComunityUpvote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,userId]` on the table `ComunityUpvote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentId` to the `ComunityUpvote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComunityUpvote" ADD COLUMN     "commentId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ComunityUpvote_comunityId_userId_key" ON "ComunityUpvote"("comunityId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ComunityUpvote_commentId_userId_key" ON "ComunityUpvote"("commentId", "userId");

-- AddForeignKey
ALTER TABLE "ComunityUpvote" ADD CONSTRAINT "ComunityUpvote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ComunityComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
