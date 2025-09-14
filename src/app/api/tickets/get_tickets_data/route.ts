import { NextResponse, NextRequest } from "next/server";
import getRouteParams from "@/lib/getRouteParams";
import { throwError, validateUser, getStatusName } from "@/lib/apiHandlers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import getParamDateRange from "@/lib/getParamDateRange";
import { RecordWithAnyValue } from "@/interfaces/global";

export async function GET(request: NextRequest) {
  try {
    const { date_from, date_to, client_id, ticket_id, ticket_status, id } =
      getRouteParams(request);

    if (!date_from || !date_to) {
      return NextResponse.json({
        data: [],
      });
    }

    let where: RecordWithAnyValue = {};

    if (id) {
      where.support_agent = +id;
    }

    if (client_id) {
      where.client_id = +client_id;
    }

    const responseData = await prisma.ticketsData.findMany({
      where: {
        ...where,
        ticket_status: {
          contains: ticket_status,
        },
        ticket_id: {
          contains: ticket_id,
        },
        ticket_date: getParamDateRange(date_from, date_to),
      },
      include: {
        client: {
          select: {
            client_name: true,
          },
        },
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
        client_id,
        ticket_status,
        client,
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
        ticket_file_url: ticket_file
          ? //http://localhost:3000/api/auth/download_files?filename=uploads/ticketsFiles/250809-000867.png
            `/auth/download_files?filename=${ticket_file}`
          : "",
        submitted_by,
        submitted_by_name: submitted_user?.name,
        support_agent,
        support_agent_name: support_agent_user?.name,
        web_developer,
        web_developer_name: web_dev_user?.name,
        oracle_developer,
        oracle_developer_name: oracle_dev_user?.name,
        client_id,
        client_name: client?.client_name,
        ticket_status,
        ticket_status_name: getStatusName(ticket_status),
      };
    });

    return validateUser({
      data: computedData,
    });
  } catch (error) {
    throwError(error);
  }
}
