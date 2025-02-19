/*
  Warnings:

  - You are about to drop the `TaskMatching` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskMatching" DROP CONSTRAINT "TaskMatching_questionId_fkey";

-- DropTable
DROP TABLE "TaskMatching";
