// app/api/pdfs/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");

  if (!folder) {
    return NextResponse.json({ files: [] });
  }

  const dir = path.join(process.cwd(), "public", "pdfs", folder);

  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".pdf"));

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
