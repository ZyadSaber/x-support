import { prisma } from "@/lib/prisma";
import generateListData from "@/lib/generateListData";
import { throwError, validateUser } from "@/lib/apiHandlers";

export async function GET() {
  try {
    const prismaData = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return validateUser(
      generateListData(prismaData, { key: "id", value: "name" })
    );
  } catch (error) {
    throwError(error);
  }
}
