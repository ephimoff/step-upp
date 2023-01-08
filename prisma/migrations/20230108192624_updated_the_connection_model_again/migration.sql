-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_profileId_fkey";

-- AlterTable
ALTER TABLE "Connections" ALTER COLUMN "profileId" DROP NOT NULL,
ALTER COLUMN "competencyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
