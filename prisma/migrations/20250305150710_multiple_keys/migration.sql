/*
  Warnings:

  - You are about to drop the column `apiKeyId` on the `Application` table. All the data in the column will be lost.
  - Added the required column `applicationId` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_apiKeyId_fkey";

-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "applicationId" TEXT NOT NULL,
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Default Key';

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "apiKeyId",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
