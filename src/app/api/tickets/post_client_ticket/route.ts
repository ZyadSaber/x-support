import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";
import { format } from "date-fns";
import getParamDateRange from "@/lib/getParamDateRange";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId } = user;

    const {
      ticket_id,
      record_status,
      ticket_date,
      ticket_description,
      ticket_name,
      ticket_status,
    } = await request.json();

    // const;
    const ticketsCount = await prisma.ticketsData.count({
      where: {
        ticket_date: getParamDateRange(),
      },
    });

    const currentTicketSerial = `T${format(new Date(), "yyMMdd-HHMM")}/${
      ticketsCount + 1
    }`;

    if (record_status === "n") {
      await prisma.ticketsData.create({
        data: {
          ticket_id: currentTicketSerial,
          ticket_name,
          ticket_description,
          ticket_date,
          submitted_by: userId,
          ticket_status,
          //   client_name,
          //   server_name,
          //   anydesk_number,
          //   anydesk_password,
          //   server_user_name,
          //   user_name_password,
          //   database_user_name,
          //   database_password,
          //   last_user_access: userId,
          //   user_updated_by: userId,
        },
      });
    } else if (record_status === "u") {
      await prisma.ticketsData.update({
        where: {
          ticket_id,
        },
        data: {
          //   client_name,
          //   server_name,
          //   anydesk_number,
          //   anydesk_password,
          //   server_user_name,
          //   user_name_password,
          //   database_user_name,
          //   database_password,
          //   user_updated_by: userId,
        },
      });
    } else if (record_status === "d") {
      await prisma.ticketsData.delete({
        where: {
          ticket_id,
        },
      });
    }

    return NextResponse.json(
      {
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
