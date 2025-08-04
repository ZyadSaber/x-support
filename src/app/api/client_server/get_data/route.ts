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
    const responseData = await prisma.clientsServerData.findMany({
      where: {},
      include: {
        client: {
          select: {
            client_name: true,
          },
        },
        updated_user: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const computedData = responseData.map((record) => {
      const {
        id,
        client_id,
        server_name,
        anydesk_number,
        anydesk_password,
        server_user_name,
        user_name_password,
        database_user_name,
        database_password,
        last_user_access,
        updatedAt,
        user,
        updated_user,
        client,
      } = record;
      return {
        id,
        client_id,
        client_name: client?.client_name,
        server_name,
        anydesk_number,
        anydesk_password,
        server_user_name,
        user_name_password,
        database_user_name,
        database_password,
        last_user_access,
        updated_at: format(updatedAt || new Date(), "yyyy-MM-dd hh:mm"),
        last_user_access_name: user?.name,
        user_updated_by_name: updated_user?.name,
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
