import { NextResponse, NextRequest } from "next/server";
import { existsSync, statSync, createReadStream } from "fs";
import path from "path";
import getRouteParams from "@/lib/getRouteParams";
import { getUserFromToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename } = getRouteParams(request);

    if (!filename || typeof filename !== "string") {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    // Security: Prevent directory traversal
    const safeFilename = path.basename(filename);

    // Validate filename format (alphanumeric, dots, hyphens, underscores)
    if (!/^[\w\-\.]+$/.test(safeFilename)) {
      return NextResponse.json(
        { error: "Invalid filename format" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), filename);
    console.log(filePath);

    // Verify file exists
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Get file stats
    const stats = statSync(filePath);

    // Create read stream
    const fileStream = createReadStream(filePath);

    // Return the file as a stream response
    return new NextResponse(fileStream as any, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/octet-stream",
        "Content-Length": stats.size.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to process download request" },
      { status: 500 }
    );
  }
}

// Optionally restrict other HTTP methods
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
