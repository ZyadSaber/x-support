import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { user_name, password } = await request.json();

    // Validate input
    if (!user_name || !password) {
      return NextResponse.json(
        { error: "User name and password are required" },
        { status: 400 }
      );
    }

    // Find user by user_name
    const user = await prisma.user.findUnique({
      where: { user_name },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid user name or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid user name or password" },
        { status: 401 }
      );
    }

    // Update last_login_time
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { last_login_time: new Date() },
    });

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      user_name: user.user_name,
      name: user.name,
    });

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          user_name: user.user_name,
          name: user.name,
          last_login_time: updatedUser.last_login_time,
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
