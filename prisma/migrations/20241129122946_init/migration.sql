-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamingService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,

    CONSTRAINT "StreamingService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieStreamingService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieStreamingService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieStreamingService_B_index" ON "_MovieStreamingService"("B");

-- AddForeignKey
ALTER TABLE "_MovieStreamingService" ADD CONSTRAINT "_MovieStreamingService_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieStreamingService" ADD CONSTRAINT "_MovieStreamingService_B_fkey" FOREIGN KEY ("B") REFERENCES "StreamingService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
