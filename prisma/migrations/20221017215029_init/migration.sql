/*
  Warnings:

  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tester` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colorIdentities` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formats` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_testerId_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "colorIdentities" INTEGER NOT NULL,
ADD COLUMN     "formats" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "Tester";

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToKeyword" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToKeyword_AB_unique" ON "_CardToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToKeyword_B_index" ON "_CardToKeyword"("B");

-- AddForeignKey
ALTER TABLE "_CardToKeyword" ADD CONSTRAINT "_CardToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToKeyword" ADD CONSTRAINT "_CardToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
