/*
  Warnings:

  - You are about to drop the `Keyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardToKeyword` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CardToKeyword" DROP CONSTRAINT "_CardToKeyword_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToKeyword" DROP CONSTRAINT "_CardToKeyword_B_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Keyword";

-- DropTable
DROP TABLE "_CardToKeyword";

-- CreateTable
CREATE TABLE "_CardToPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToPlayer_AB_unique" ON "_CardToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToPlayer_B_index" ON "_CardToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_CardToPlayer" ADD CONSTRAINT "_CardToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToPlayer" ADD CONSTRAINT "_CardToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
