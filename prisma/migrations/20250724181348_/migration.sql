-- AlterTable
ALTER TABLE "TicketsData" ADD COLUMN     "ticket_status" TEXT NOT NULL DEFAULT 'O',
ALTER COLUMN "client_name" SET DEFAULT '';
