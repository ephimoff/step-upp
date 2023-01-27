/*
  Warnings:

  - You are about to drop the column `score360` on the `ProfileScores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfileScores" DROP COLUMN "score360";

-- CreateTable
CREATE TABLE "ThreeSixtyScores" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "appraiseeId" TEXT NOT NULL,

    CONSTRAINT "ThreeSixtyScores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreeSixtyScores" ADD CONSTRAINT "ThreeSixtyScores_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeSixtyScores" ADD CONSTRAINT "ThreeSixtyScores_appraiseeId_fkey" FOREIGN KEY ("appraiseeId") REFERENCES "ProfileScores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
