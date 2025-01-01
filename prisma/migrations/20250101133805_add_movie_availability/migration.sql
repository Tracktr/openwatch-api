/*
  Warnings:

  - You are about to drop the `_MovieStreamingService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieStreamingService" DROP CONSTRAINT "_MovieStreamingService_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieStreamingService" DROP CONSTRAINT "_MovieStreamingService_B_fkey";

-- DropTable
DROP TABLE "_MovieStreamingService";

-- CreateTable
CREATE TABLE "MovieAvailability" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "streamingServiceId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "MovieAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieAvailability_movieId_streamingServiceId_country_key" ON "MovieAvailability"("movieId", "streamingServiceId", "country");

-- AddForeignKey
ALTER TABLE "MovieAvailability" ADD CONSTRAINT "MovieAvailability_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAvailability" ADD CONSTRAINT "MovieAvailability_streamingServiceId_fkey" FOREIGN KEY ("streamingServiceId") REFERENCES "StreamingService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
