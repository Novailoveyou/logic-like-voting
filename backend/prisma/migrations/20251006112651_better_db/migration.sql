/*
  Warnings:

  - The primary key for the `votes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `votes` table. All the data in the column will be lost.
  - You are about to drop the column `userIp` on the `votes` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ip` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."votes" DROP CONSTRAINT "votes_userIp_fkey";

-- DropIndex
DROP INDEX "public"."votes_id_key";

-- AlterTable
ALTER TABLE "votes" DROP CONSTRAINT "votes_pkey",
DROP COLUMN "id",
DROP COLUMN "userIp",
ADD COLUMN     "ip" TEXT NOT NULL,
ADD CONSTRAINT "votes_pkey" PRIMARY KEY ("ip", "ideaId");

-- DropTable
DROP TABLE "public"."users";
