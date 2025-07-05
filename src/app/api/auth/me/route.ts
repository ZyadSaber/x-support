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
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

    return NextResponse.json({
      user: {
        id: user.id,
        user_name: user.user_name,
        name: user.name,
        last_login_time: format(
          dbUser?.last_login_time || new Date(),
          "yyyy-MM-dd hh:mm"
        ),
        user_role: dbUser?.user_role,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
