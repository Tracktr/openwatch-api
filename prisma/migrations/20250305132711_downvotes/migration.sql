/*
  Warnings:

  - You are about to drop the `AvailabilityVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvailabilityVote" DROP CONSTRAINT "AvailabilityVote_movieAvailabilityId_fkey";

-- DropTable
DROP TABLE "AvailabilityVote";

-- CreateTable
CREATE TABLE "AvailabilityUpvote" (
    "id" SERIAL NOT NULL,
    "movieAvailabilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvailabilityUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilityDownvote" (
    "id" SERIAL NOT NULL,
    "movieAvailabilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvailabilityDownvote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AvailabilityUpvote" ADD CONSTRAINT "AvailabilityUpvote_movieAvailabilityId_fkey" FOREIGN KEY ("movieAvailabilityId") REFERENCES "MovieAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilityDownvote" ADD CONSTRAINT "AvailabilityDownvote_movieAvailabilityId_fkey" FOREIGN KEY ("movieAvailabilityId") REFERENCES "MovieAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
