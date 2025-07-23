/*
  Warnings:

  - The primary key for the `TicketsData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TicketsData" DROP CONSTRAINT "TicketsData_pkey",
ALTER COLUMN "ticket_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TicketsData_pkey" PRIMARY KEY ("ticket_id");
