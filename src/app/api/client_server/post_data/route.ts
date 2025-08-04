import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId } = user;

    const {
      record_status,
      client_id,
      server_name,
      anydesk_number,
      anydesk_password,
      server_user_name,
      user_name_password,
      database_user_name,
      database_password,
      id,
    } = await request.json();

    if (record_status === "n") {
      await prisma.clientsServerData.create({
        data: {
          client_id,
          server_name,
          anydesk_number,
          anydesk_password,
          server_user_name,
          user_name_password,
          database_user_name,
          database_password,
          last_user_access: userId,
          user_updated_by: userId,
        },
      });
    } else if (record_status === "u") {
      await prisma.clientsServerData.update({
        where: {
          id,
        },
        data: {
          client_id,
          server_name,
          anydesk_number,
          anydesk_password,
          server_user_name,
          user_name_password,
          database_user_name,
          database_password,
          user_updated_by: userId,
        },
      });
    } else if (record_status === "d") {
      await prisma.clientsServerData.delete({
        where: {
          id,
        },
      });
    }

    // await prisma.clientsServerData.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     last_user_access: userId,
    //   },
    // });

    // Create response with cookie
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
