import { NextResponse, NextRequest } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import generateListData from "@/lib/generateListData";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prismaData = await prisma.clients_data.findMany({
      select: {
        client_id: true,
        client_name: true,
      },
    });

    return NextResponse.json(
      generateListData(prismaData, { key: "client_id", value: "client_name" })
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
