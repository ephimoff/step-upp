/*
  Warnings:

  - You are about to drop the column `profileId` on the `Competency` table. All the data in the column will be lost.
  - You are about to drop the column `competencyId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ProfileCompetencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Competency" DROP CONSTRAINT "Competency_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_competencyId_fkey";

-- AlterTable
ALTER TABLE "Competency" DROP COLUMN "profileId",
ADD COLUMN     "connectionId" TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "competencyId",
ADD COLUMN     "connectionId" TEXT;

-- DropTable
DROP TABLE "ProfileCompetencies";

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competency" ADD CONSTRAINT "Competency_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
