/*
  Warnings:

  - You are about to drop the `ThreeSixtyScores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ThreeSixtyScores" DROP CONSTRAINT "ThreeSixtyScores_appraiseeProfileId_appraiseeSkillId_fkey";

-- DropForeignKey
ALTER TABLE "ThreeSixtyScores" DROP CONSTRAINT "ThreeSixtyScores_appraiserId_fkey";

-- DropTable
DROP TABLE "ThreeSixtyScores";

-- CreateTable
CREATE TABLE "FeedbackScores" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appraiserId" TEXT NOT NULL,
    "appraiseeProfileId" TEXT NOT NULL,
    "appraiseeSkillId" TEXT NOT NULL,

    CONSTRAINT "FeedbackScores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedbackScores" ADD CONSTRAINT "FeedbackScores_appraiserId_fkey" FOREIGN KEY ("appraiserId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackScores" ADD CONSTRAINT "FeedbackScores_appraiseeProfileId_appraiseeSkillId_fkey" FOREIGN KEY ("appraiseeProfileId", "appraiseeSkillId") REFERENCES "ProfileScores"("profileId", "skillId") ON DELETE RESTRICT ON UPDATE CASCADE;
