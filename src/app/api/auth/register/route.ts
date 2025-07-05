import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { user_name, password, name } = await request.json();

    // Validate input
    if (!user_name || !password || !name) {
      return NextResponse.json(
        { error: "User name, password, and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { user_name },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this user name already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        user_name,
        password: hashedPassword,
        name,
      },
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
        message: "User registered successfully",
        user: {
          id: user.id,
          user_name: user.user_name,
          name: user.name,
        },
      },
      { status: 201 }
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
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
