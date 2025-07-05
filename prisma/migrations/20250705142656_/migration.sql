-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_login_time" TIMESTAMP(3),
ADD COLUMN     "user_role" TEXT NOT NULL DEFAULT 'S';

-- CreateTable
CREATE TABLE "ClientsServerData" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT,
    "server_name" TEXT,
    "anydesk_number" TEXT,
    "anydesk_password" TEXT,
    "server_user_name" TEXT,
    "user_name_password" TEXT,
    "database_user_name" TEXT,
    "database_password" TEXT,
    "last_user_access" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientsServerData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientsServerData" ADD CONSTRAINT "ClientsServerData_last_user_access_fkey" FOREIGN KEY ("last_user_access") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
