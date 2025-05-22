/*
  Warnings:

  - You are about to drop the column `downvote` on the `Comunity` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `Comunity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comunity" DROP COLUMN "downvote",
DROP COLUMN "upvote";

-- CreateTable
CREATE TABLE "ComunityUpvote" (
    "id" UUID NOT NULL,
    "comunityId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComunityUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "ComunityUpvote" ADD CONSTRAINT "ComunityUpvote_comunityId_fkey" FOREIGN KEY ("comunityId") REFERENCES "Comunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComunityUpvote" ADD CONSTRAINT "ComunityUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
