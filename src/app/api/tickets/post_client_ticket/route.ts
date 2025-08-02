import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";
import { format } from "date-fns";
import getParamDateRange from "@/lib/getParamDateRange";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const {
      ticket_id,
      ticket_name,
      ticket_status,
      client_id,
      ticket_date,
      ticket_end_date,
      ticket_description,
      submitted_by,
      support_agent,
      web_developer,
      oracle_developer,
      files,
      record_status,
    } = await request.json();

    const ticketsCount = await prisma.ticketsData.count({
      where: {
        ticket_date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 0, 0)),
        },
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
          ticket_date: new Date(ticket_date),
          ticket_end_date: ticket_end_date
            ? new Date(ticket_end_date || "")
            : undefined,
          submitted_by,
          ticket_status,
          client_id,
          support_agent,
          web_developer,
          oracle_developer,
        },
      });
    } else if (record_status === "u") {
      await prisma.ticketsData.update({
        where: {
          ticket_id,
        },
        data: {
          ticket_name,
          ticket_description,
          ticket_date: new Date(ticket_date),
          ticket_end_date: ticket_end_date,
          submitted_by,
          ticket_status,
          client_id,
          support_agent,
          web_developer,
          oracle_developer,
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
