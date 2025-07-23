-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_disabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TicketsData" (
    "ticket_id" INTEGER NOT NULL,
    "ticket_name" TEXT NOT NULL,
    "ticket_description" TEXT NOT NULL,
    "ticket_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_end_date" TIMESTAMP(3),
    "ticket_file" TEXT,
    "submitted_by" INTEGER NOT NULL,
    "support_agent" INTEGER,
    "web_developer" INTEGER,
    "oracle_developer" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketsData_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "TicketsData" ADD CONSTRAINT "TicketsData_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsData" ADD CONSTRAINT "TicketsData_support_agent_fkey" FOREIGN KEY ("support_agent") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsData" ADD CONSTRAINT "TicketsData_web_developer_fkey" FOREIGN KEY ("web_developer") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsData" ADD CONSTRAINT "TicketsData_oracle_developer_fkey" FOREIGN KEY ("oracle_developer") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
