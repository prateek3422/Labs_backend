/*
  Warnings:

  - You are about to drop the column `isActive` on the `Contest` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContestStatus" AS ENUM ('UPCOMING', 'LIVE', 'ENDED');

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "isActive",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 90,
ADD COLUMN     "status" "ContestStatus" NOT NULL DEFAULT 'UPCOMING';

-- AlterTable
ALTER TABLE "UserActivity" ADD COLUMN     "streakCount" INTEGER NOT NULL DEFAULT 0;
