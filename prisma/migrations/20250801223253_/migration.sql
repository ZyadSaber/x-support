-- CreateTable
CREATE TABLE "clients_data" (
    "client_id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_location" TEXT,
    "client_phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_data_pkey" PRIMARY KEY ("client_id")
);
