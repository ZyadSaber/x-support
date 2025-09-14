import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { RecordWithAnyValue } from "@/interfaces/global";

export const validateUser = async (response: RecordWithAnyValue) => {
  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(response);
};

export const throwError = async (error: unknown) => {
  console.error("Get user error:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};

export const getStatusName = (status) => {
  if (status === "O") {
    return "Open";
  } else if (status === "C") {
    return "Closed";
  }
};

export const getAdminRoles = (role: string) => {
  if (role === "SA") {
    return "Super Admin";
  } else if (role === "A") {
    return "Admin";
  } else if (role === "S") {
    return "Support";
  } else if (role === "D") {
    return "Developer";
  }
};
