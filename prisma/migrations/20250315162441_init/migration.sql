/*
  Warnings:

  - You are about to drop the column `originalWordCount` on the `Abstract` table. All the data in the column will be lost.
  - Added the required column `originalWordsCount` to the `Abstract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Abstract" DROP COLUMN "originalWordCount",
ADD COLUMN     "originalWordsCount" INTEGER NOT NULL;
