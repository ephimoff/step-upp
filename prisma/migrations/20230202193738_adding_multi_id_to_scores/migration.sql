/*
  Warnings:

  - The primary key for the `ProfileScores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProfileScores` table. All the data in the column will be lost.
  - You are about to drop the column `appraiseeId` on the `ThreeSixtyScores` table. All the data in the column will be lost.
  - Made the column `profileId` on table `ProfileScores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `skillId` on table `ProfileScores` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `appraiseeProfileId` to the `ThreeSixtyScores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appraiseeSkillId` to the `ThreeSixtyScores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfileScores" DROP CONSTRAINT "ProfileScores_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileScores" DROP CONSTRAINT "ProfileScores_skillId_fkey";

-- DropForeignKey
ALTER TABLE "ThreeSixtyScores" DROP CONSTRAINT "ThreeSixtyScores_appraiseeId_fkey";

-- AlterTable
ALTER TABLE "ProfileScores" DROP CONSTRAINT "ProfileScores_pkey",
DROP COLUMN "id",
ALTER COLUMN "profileId" SET NOT NULL,
ALTER COLUMN "skillId" SET NOT NULL,
ADD CONSTRAINT "ProfileScores_pkey" PRIMARY KEY ("profileId", "skillId");

-- AlterTable
ALTER TABLE "ThreeSixtyScores" DROP COLUMN "appraiseeId",
ADD COLUMN     "appraiseeProfileId" TEXT NOT NULL,
ADD COLUMN     "appraiseeSkillId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProfileScores" ADD CONSTRAINT "ProfileScores_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileScores" ADD CONSTRAINT "ProfileScores_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeSixtyScores" ADD CONSTRAINT "ThreeSixtyScores_appraiseeProfileId_appraiseeSkillId_fkey" FOREIGN KEY ("appraiseeProfileId", "appraiseeSkillId") REFERENCES "ProfileScores"("profileId", "skillId") ON DELETE RESTRICT ON UPDATE CASCADE;
