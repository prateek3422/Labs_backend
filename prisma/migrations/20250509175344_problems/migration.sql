/*
  Warnings:

  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_userId_fkey";

-- DropTable
DROP TABLE "Problem";

-- CreateTable
CREATE TABLE "Problems" (
    "id" UUID NOT NULL,
    "title" VARCHAR(191) NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "difficulty" "ProblemDifficulty" NOT NULL DEFAULT 'EASY',
    "userId" UUID NOT NULL,
    "example" JSONB NOT NULL,
    "constraints" TEXT NOT NULL,
    "hints" TEXT,
    "editorial" TEXT NOT NULL,
    "tetsCases" JSONB NOT NULL,
    "codeSnippet" JSONB NOT NULL,
    "refenceSolutions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problems" ADD CONSTRAINT "Problems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
