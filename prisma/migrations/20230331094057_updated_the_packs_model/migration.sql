/*
  Warnings:

  - The primary key for the `Packs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `packName` on the `Packs` table. All the data in the column will be lost.
  - Changed the type of `id` on the `Packs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Packs_packName_key";

-- AlterTable
ALTER TABLE "Packs" DROP CONSTRAINT "Packs_pkey",
DROP COLUMN "packName",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Packs_pkey" PRIMARY KEY ("id");
