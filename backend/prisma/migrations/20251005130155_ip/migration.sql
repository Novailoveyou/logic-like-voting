/*
  Warnings:

  - A unique constraint covering the columns `[userIp]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_userIp_key" ON "votes"("userIp");
