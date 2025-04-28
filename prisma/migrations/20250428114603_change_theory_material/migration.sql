/*
  Warnings:

  - Added the required column `usage` to the `TheoryMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TheoryMaterial" ADD COLUMN     "usage" BOOLEAN NOT NULL;
