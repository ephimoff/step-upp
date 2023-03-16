/*
  Warnings:

  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `workspaceId` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `WorkspaceAccess` table. All the data in the column will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organisationId` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationId` to the `WorkspaceAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_planId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceAccess" DROP CONSTRAINT "WorkspaceAccess_workspaceId_fkey";

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "workspaceId",
ADD COLUMN     "organisationId" TEXT NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("userId", "organisationId");

-- AlterTable
ALTER TABLE "WorkspaceAccess" DROP COLUMN "workspaceId",
ADD COLUMN     "organisationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Workspace";

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceAccess" ADD CONSTRAINT "WorkspaceAccess_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
