-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProblemDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "otp" TEXT NOT NULL DEFAULT '',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
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

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
