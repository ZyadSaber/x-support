import { NextResponse, NextRequest } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import generateListData from "@/lib/generateListData";
import getRouteParams from "@/lib/getRouteParams";
import { getAdminRoles, throwError, validateUser } from "@/lib/apiHandlers";
import { format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const { user_role, name, user_name } = getRouteParams(request);

    const responseData = await prisma.user.findMany({
      where: {
        user_role,
        name: {
          contains: name,
        },
        user_name: {
          contains: user_name,
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        user_name: true,
        last_login_time: true,
        user_role: true,
        user_disabled: true,
      },
    });

    const computedData = responseData.map((record) => {
      const {
        id,
        name,
        createdAt,
        updatedAt,
        user_name,
        last_login_time,
        user_role,
        user_disabled,
      } = record;
      return {
        id,
        user_description: name,
        user_name,
        updated_at: format(updatedAt, "yyyy-MM-dd hh:mm"),
        created_at: format(createdAt, "yyyy-MM-dd hh:mm"),
        last_login_time: format(last_login_time, "yyyy-MM-dd hh:mm"),
        user_disabled,
        user_role,
        user_role_name: getAdminRoles(user_role),
      };
    });

    return validateUser({
      data: computedData,
    });
  } catch (error) {
    throwError(error);
  }
}
