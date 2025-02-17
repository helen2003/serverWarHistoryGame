/*
  Warnings:

  - You are about to drop the `Material` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeMaterial` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[questionId]` on the table `ResponceTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_typeMaterialId_fkey";

-- DropForeignKey
ALTER TABLE "ParameterNS" DROP CONSTRAINT "ParameterNS_modelNSId_fkey";

-- DropForeignKey
ALTER TABLE "ResponceTemplate" DROP CONSTRAINT "ResponceTemplate_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ResponceTesting" DROP CONSTRAINT "ResponceTesting_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ResponceTesting" DROP CONSTRAINT "ResponceTesting_testingId_fkey";

-- DropForeignKey
ALTER TABLE "ResultRecognition" DROP CONSTRAINT "ResultRecognition_responceTestingId_fkey";

-- DropForeignKey
ALTER TABLE "Testing" DROP CONSTRAINT "Testing_userId_fkey";

-- DropTable
DROP TABLE "Material";

-- DropTable
DROP TABLE "TypeMaterial";

-- CreateTable
CREATE TABLE "TheoryMaterial" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "topicId" INTEGER,
    "typeFileId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TheoryMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticMaterial" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "typeFileId" INTEGER,
    "questionId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "PracticMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TypeFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponceTemplate_questionId_key" ON "ResponceTemplate"("questionId");

-- AddForeignKey
ALTER TABLE "TheoryMaterial" ADD CONSTRAINT "TheoryMaterial_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheoryMaterial" ADD CONSTRAINT "TheoryMaterial_typeFileId_fkey" FOREIGN KEY ("typeFileId") REFERENCES "TypeFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticMaterial" ADD CONSTRAINT "PracticMaterial_typeFileId_fkey" FOREIGN KEY ("typeFileId") REFERENCES "TypeFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticMaterial" ADD CONSTRAINT "PracticMaterial_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testing" ADD CONSTRAINT "Testing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponceTesting" ADD CONSTRAINT "ResponceTesting_testingId_fkey" FOREIGN KEY ("testingId") REFERENCES "Testing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponceTesting" ADD CONSTRAINT "ResponceTesting_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponceTemplate" ADD CONSTRAINT "ResponceTemplate_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultRecognition" ADD CONSTRAINT "ResultRecognition_responceTestingId_fkey" FOREIGN KEY ("responceTestingId") REFERENCES "ResponceTesting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterNS" ADD CONSTRAINT "ParameterNS_modelNSId_fkey" FOREIGN KEY ("modelNSId") REFERENCES "ModelNS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
