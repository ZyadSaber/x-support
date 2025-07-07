/*
  Warnings:

  - You are about to drop the column `last_user_updated` on the `ClientsServerData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientsServerData" DROP CONSTRAINT "ClientsServerData_last_user_updated_fkey";

-- AlterTable
ALTER TABLE "ClientsServerData" DROP COLUMN "last_user_updated",
ADD COLUMN     "user_updated_by" INTEGER;

-- AddForeignKey
ALTER TABLE "ClientsServerData" ADD CONSTRAINT "ClientsServerData_user_updated_by_fkey" FOREIGN KEY ("user_updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
