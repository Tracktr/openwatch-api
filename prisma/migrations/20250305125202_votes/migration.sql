/*
  Warnings:

  - Added the required column `updatedAt` to the `MovieAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieAvailability" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "AvailabilityVote" (
    "id" SERIAL NOT NULL,
    "movieAvailabilityId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "isUpvote" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvailabilityVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilityVote_movieAvailabilityId_sessionId_key" ON "AvailabilityVote"("movieAvailabilityId", "sessionId");

-- AddForeignKey
ALTER TABLE "AvailabilityVote" ADD CONSTRAINT "AvailabilityVote_movieAvailabilityId_fkey" FOREIGN KEY ("movieAvailabilityId") REFERENCES "MovieAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
