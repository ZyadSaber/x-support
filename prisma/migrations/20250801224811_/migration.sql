/*
  Warnings:

  - You are about to drop the column `client_name` on the `ClientsServerData` table. All the data in the column will be lost.
  - You are about to drop the column `client_name` on the `TicketsData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClientsServerData" DROP COLUMN "client_name",
ADD COLUMN     "client_id" INTEGER;

-- AlterTable
ALTER TABLE "TicketsData" DROP COLUMN "client_name",
ADD COLUMN     "client_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ClientsServerData" ADD CONSTRAINT "ClientsServerData_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients_data"("client_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsData" ADD CONSTRAINT "TicketsData_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients_data"("client_id") ON DELETE SET NULL ON UPDATE CASCADE;
