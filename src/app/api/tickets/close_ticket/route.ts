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

    const { ticket_id } = await request.json();

    await prisma.ticketsData.update({
      where: {
        ticket_id,
      },
      data: {
        ticket_status: "C",
        ticket_end_date: new Date(),
      },
    });

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
