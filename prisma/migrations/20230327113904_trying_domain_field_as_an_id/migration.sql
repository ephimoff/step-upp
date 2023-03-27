/*
  Warnings:

  - The primary key for the `WorkspaceAccess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WorkspaceAccess` table. All the data in the column will be lost.
  - Made the column `domain` on table `WorkspaceAccess` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "WorkspaceAccess_domain_key";

-- AlterTable
ALTER TABLE "WorkspaceAccess" DROP CONSTRAINT "WorkspaceAccess_pkey",
DROP COLUMN "id",
ALTER COLUMN "domain" SET NOT NULL,
ADD CONSTRAINT "WorkspaceAccess_pkey" PRIMARY KEY ("domain");
