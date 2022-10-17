/*
  Warnings:

  - The primary key for the `SubType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `SubType` table. All the data in the column will be lost.
  - The primary key for the `SuperType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `SuperType` table. All the data in the column will be lost.
  - The primary key for the `Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Type` table. All the data in the column will be lost.
  - Added the required column `id` to the `SubType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `SuperType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CardToSubType" DROP CONSTRAINT "_CardToSubType_B_fkey";

-- DropForeignKey
ALTER TABLE "_CardToSuperType" DROP CONSTRAINT "_CardToSuperType_B_fkey";

-- DropForeignKey
ALTER TABLE "_CardToType" DROP CONSTRAINT "_CardToType_B_fkey";

-- AlterTable
ALTER TABLE "SubType" DROP CONSTRAINT "SubType_pkey",
DROP COLUMN "name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SubType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SuperType" DROP CONSTRAINT "SuperType_pkey",
DROP COLUMN "name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SuperType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Type" DROP CONSTRAINT "Type_pkey",
DROP COLUMN "name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Type_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_CardToType" ADD CONSTRAINT "_CardToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToSubType" ADD CONSTRAINT "_CardToSubType_B_fkey" FOREIGN KEY ("B") REFERENCES "SubType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToSuperType" ADD CONSTRAINT "_CardToSuperType_B_fkey" FOREIGN KEY ("B") REFERENCES "SuperType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
