/*
  Warnings:

  - Added the required column `description` to the `Pack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pack" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PackCompetencies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "packId" TEXT NOT NULL,

    CONSTRAINT "PackCompetencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackSkills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "competencyId" TEXT NOT NULL,

    CONSTRAINT "PackSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackCompetencies" ADD CONSTRAINT "PackCompetencies_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackSkills" ADD CONSTRAINT "PackSkills_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "PackCompetencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
