import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export async function GET() {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch last_login_time from DB
    const responseData = await prisma.ticketsData.findMany({
      where: {},
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
