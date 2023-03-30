/*
  Warnings:

  - You are about to drop the `Pack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackCompetencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PackCompetencies" DROP CONSTRAINT "PackCompetencies_packId_fkey";

-- DropForeignKey
ALTER TABLE "PackSkills" DROP CONSTRAINT "PackSkills_competencyId_fkey";

-- DropTable
DROP TABLE "Pack";

-- DropTable
DROP TABLE "PackCompetencies";

-- DropTable
DROP TABLE "PackSkills";

-- CreateTable
CREATE TABLE "Packs" (
    "id" TEXT NOT NULL,
    "packName" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Packs_packName_key" ON "Packs"("packName");

-- AddForeignKey
ALTER TABLE "Packs" ADD CONSTRAINT "Packs_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
