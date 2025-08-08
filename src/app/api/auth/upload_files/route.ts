import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import getRouteParams from "@/lib/getRouteParams";
import { join } from "path";
import { format } from "date-fns";
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import getFileExtension from "@/lib/getFileExtension";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const { dir } = getRouteParams(request);
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded - Please select a file" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const currentSerial = `${format(new Date(), "yyMMdd-HHMMSS")}`;

    const fileName = `${currentSerial}.${getFileExtension(file.name)}`.replace(
      /\s+/g,
      ""
    );

    // Use process.cwd() for consistent paths
    const uploadDir = join(process.cwd(), "uploads", dir);
    const filePath = join(uploadDir, fileName);

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    await writeFile(filePath, buffer);

    // Return the public accessible path (without 'public')
    const publicPath = join("/uploads", dir, fileName);

    return NextResponse.json({
      success: true,
      path: publicPath,
      filename: fileName,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file - Please try again" },
      { status: 500 }
    );
  }
}
