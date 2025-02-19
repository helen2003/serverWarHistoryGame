/*
  Warnings:

  - You are about to drop the column `table_1` on the `TaskMatching` table. All the data in the column will be lost.
  - You are about to drop the column `table_2` on the `TaskMatching` table. All the data in the column will be lost.
  - Added the required column `column_1` to the `TaskMatching` table without a default value. This is not possible if the table is not empty.
  - Added the required column `column_2` to the `TaskMatching` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResponceTemplate" DROP CONSTRAINT "ResponceTemplate_questionId_fkey";

-- DropIndex
DROP INDEX "ResponceTemplate_questionId_key";

-- AlterTable
ALTER TABLE "TaskMatching" DROP COLUMN "table_1",
DROP COLUMN "table_2",
ADD COLUMN     "column_1" TEXT NOT NULL,
ADD COLUMN     "column_2" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ResponceTemplate" ADD CONSTRAINT "ResponceTemplate_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
