/*
  Warnings:

  - You are about to drop the column `topicId` on the `TheoryMaterial` table. All the data in the column will be lost.
  - Added the required column `description` to the `TheoryMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TheoryMaterial" DROP CONSTRAINT "TheoryMaterial_topicId_fkey";

-- AlterTable
ALTER TABLE "TheoryMaterial" DROP COLUMN "topicId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "subtopicId" INTEGER;

-- CreateTable
CREATE TABLE "Subtopic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "topicId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtopic" ADD CONSTRAINT "Subtopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoryMaterial" ADD CONSTRAINT "TheoryMaterial_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Subtopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
