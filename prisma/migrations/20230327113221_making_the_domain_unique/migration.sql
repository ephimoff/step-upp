/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `WorkspaceAccess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceAccess_domain_key" ON "WorkspaceAccess"("domain");
