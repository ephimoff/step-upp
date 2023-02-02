/*
  Warnings:

  - You are about to drop the column `profileId` on the `ThreeSixtyScores` table. All the data in the column will be lost.
  - Added the required column `appraiserId` to the `ThreeSixtyScores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ThreeSixtyScores" DROP CONSTRAINT "ThreeSixtyScores_profileId_fkey";

-- AlterTable
ALTER TABLE "ThreeSixtyScores" DROP COLUMN "profileId",
ADD COLUMN     "appraiserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ThreeSixtyScores" ADD CONSTRAINT "ThreeSixtyScores_appraiserId_fkey" FOREIGN KEY ("appraiserId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
