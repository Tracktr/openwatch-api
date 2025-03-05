/*
  Warnings:

  - You are about to drop the column `downvotes` on the `MovieAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `MovieAvailability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MovieAvailability" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";
