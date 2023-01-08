/*
  Warnings:

  - You are about to drop the column `connectionId` on the `Competency` table. All the data in the column will be lost.
  - You are about to drop the column `connectionId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Competency" DROP CONSTRAINT "Competency_connectionId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_connectionId_fkey";

-- AlterTable
ALTER TABLE "Competency" DROP COLUMN "connectionId";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "connectionId";

-- DropTable
DROP TABLE "Connection";

-- CreateTable
CREATE TABLE "Connections" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "competencyId" TEXT NOT NULL,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
