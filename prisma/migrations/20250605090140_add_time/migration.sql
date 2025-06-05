/*
  Warnings:

  - Added the required column `timeTaken` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "timeTaken" TIMESTAMP(3) NOT NULL;
