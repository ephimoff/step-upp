/*
  Warnings:

  - A unique constraint covering the columns `[skillId]` on the table `ProfileScores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfileScores_skillId_key" ON "ProfileScores"("skillId");
