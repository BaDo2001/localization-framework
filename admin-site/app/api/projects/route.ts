import { NextResponse } from "next/server";

import { requireProjectApiKey } from "@/api/utils/requireProjectApiKey";

export async function GET() {
  const project = await requireProjectApiKey(false);

  return NextResponse.json({
    project,
  });
}
