/*
  Warnings:

  - Added the required column `correct` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "correct" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "TaskMatching" (
    "id" SERIAL NOT NULL,
    "table_1" TEXT NOT NULL,
    "table_2" TEXT NOT NULL,
    "questionId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TaskMatching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileAnswer" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "FileAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileAnswer_answerId_key" ON "FileAnswer"("answerId");

-- AddForeignKey
ALTER TABLE "TaskMatching" ADD CONSTRAINT "TaskMatching_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAnswer" ADD CONSTRAINT "FileAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
