/*
  Warnings:

  - Added the required column `originalWordCount` to the `Abstract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Abstract" ADD COLUMN     "originalWordCount" INTEGER NOT NULL;
