import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();
    const { user_name, password } = await request.json();

    // Validate input
    if (!user_name || !password) {
      return NextResponse.json(
        { error: "User name and password are required" },
        { status: 400 }
      );
    }

    // Create response with cookie
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          // id: user.id,
          // user_name: user.user_name,
          // name: user.name,
          // last_login_time: updatedUser.last_login_time,
        },
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
