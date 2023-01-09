/*
  Warnings:

  - You are about to drop the column `actions` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `score360` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `Connections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_profileId_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "actions",
DROP COLUMN "score",
DROP COLUMN "score360";

-- DropTable
DROP TABLE "Connections";

-- CreateTable
CREATE TABLE "ProfileCompetencies" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "competencyId" TEXT,

    CONSTRAINT "ProfileCompetencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileScores" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "skillId" TEXT,
    "score" INTEGER,
    "score360" INTEGER,

    CONSTRAINT "ProfileScores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileCompetencies" ADD CONSTRAINT "ProfileCompetencies_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileCompetencies" ADD CONSTRAINT "ProfileCompetencies_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileScores" ADD CONSTRAINT "ProfileScores_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileScores" ADD CONSTRAINT "ProfileScores_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
