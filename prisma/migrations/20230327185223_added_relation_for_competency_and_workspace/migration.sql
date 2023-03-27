/*
  Warnings:

  - Added the required column `workspaceId` to the `Competency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competency" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Competency" ADD CONSTRAINT "Competency_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
