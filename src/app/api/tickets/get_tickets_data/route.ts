import { NextResponse, NextRequest } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { getStatusName } from "@/lib/getStatusName";
import getRouteParams from "@/lib/getRouteParams";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { date_from, date_to, client_name, ticket_id, ticket_status } =
      getRouteParams(request);

    const responseData = await prisma.ticketsData.findMany({
      where: {
        ticket_status,
        client_name: {
          contains: client_name,
        },
        ticket_id: {
          contains: ticket_id,
        },
        ticket_date: {
          gte: new Date(date_from),
          lte: new Date(date_to),
        },
      },
      include: {
        submitted_user: {
          select: {
            name: true,
          },
        },
        support_agent_user: {
          select: {
            name: true,
          },
        },
        web_dev_user: {
          select: {
            name: true,
          },
        },
        oracle_dev_user: {
          select: {
            name: true,
          },
        },
      },
    });

    const computedData = responseData.map((record) => {
      const {
        ticket_id,
        ticket_name,
        ticket_description,
        ticket_date,
        ticket_end_date,
        ticket_file,
        submitted_by,
        support_agent,
        web_developer,
        oracle_developer,
        updatedAt,
        createdAt,
        submitted_user,
        support_agent_user,
        web_dev_user,
        oracle_dev_user,
        client_name,
        ticket_status,
      } = record;
      return {
        ticket_id,
        ticket_name,
        ticket_description,
        ticket_date: format(ticket_date, "yyyy-MM-dd hh:mm"),
        ticket_end_date: ticket_end_date
          ? format(ticket_end_date, "yyyy-MM-dd hh:mm")
          : undefined,
        updated_at: format(updatedAt, "yyyy-MM-dd hh:mm"),
        created_at: format(createdAt, "yyyy-MM-dd hh:mm"),
        ticket_file,
        submitted_by,
        submitted_by_name: submitted_user?.name,
        support_agent,
        support_agent_name: support_agent_user?.name,
        web_developer,
        web_developer_name: web_dev_user?.name,
        oracle_developer,
        oracle_developer_name: oracle_dev_user?.name,
        client_name,
        ticket_status,
        ticket_status_name: getStatusName(ticket_status),
      };
    });

    return NextResponse.json({
      data: computedData,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
