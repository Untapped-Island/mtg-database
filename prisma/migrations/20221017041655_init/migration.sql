/*
  Warnings:

  - The primary key for the `SubType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SubType` table. All the data in the column will be lost.
  - The primary key for the `SuperType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SuperType` table. All the data in the column will be lost.
  - The primary key for the `Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Type` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SubType_name_key";

-- DropIndex
DROP INDEX "SuperType_name_key";

-- DropIndex
DROP INDEX "Type_name_key";

-- AlterTable
ALTER TABLE "SubType" DROP CONSTRAINT "SubType_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SubType_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "SuperType" DROP CONSTRAINT "SuperType_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SuperType_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Type" DROP CONSTRAINT "Type_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Type_pkey" PRIMARY KEY ("name");

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullType" TEXT NOT NULL,
    "power" DOUBLE PRECISION,
    "toughness" DOUBLE PRECISION,
    "manaCost" TEXT NOT NULL,
    "manaValue" INTEGER NOT NULL,
    "colors" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToType" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CardToSubType" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CardToSuperType" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_name_key" ON "Card"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToType_AB_unique" ON "_CardToType"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToType_B_index" ON "_CardToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToSubType_AB_unique" ON "_CardToSubType"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToSubType_B_index" ON "_CardToSubType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToSuperType_AB_unique" ON "_CardToSuperType"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToSuperType_B_index" ON "_CardToSuperType"("B");

-- AddForeignKey
ALTER TABLE "_CardToType" ADD CONSTRAINT "_CardToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToType" ADD CONSTRAINT "_CardToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToSubType" ADD CONSTRAINT "_CardToSubType_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToSubType" ADD CONSTRAINT "_CardToSubType_B_fkey" FOREIGN KEY ("B") REFERENCES "SubType"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToSuperType" ADD CONSTRAINT "_CardToSuperType_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToSuperType" ADD CONSTRAINT "_CardToSuperType_B_fkey" FOREIGN KEY ("B") REFERENCES "SuperType"("name") ON DELETE CASCADE ON UPDATE CASCADE;
