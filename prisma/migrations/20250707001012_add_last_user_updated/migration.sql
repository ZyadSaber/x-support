-- AlterTable
ALTER TABLE "ClientsServerData" ADD COLUMN     "last_user_updated" INTEGER;

-- AddForeignKey
ALTER TABLE "ClientsServerData" ADD CONSTRAINT "ClientsServerData_last_user_updated_fkey" FOREIGN KEY ("last_user_updated") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
