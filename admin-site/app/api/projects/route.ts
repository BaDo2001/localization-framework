import { NextResponse } from "next/server";

import { requireProjectApiKey } from "@/api/utils/requireProjectApiKey";

/*
GET /api/projects

Returns: {
  project: Project
}
*/

export async function GET() {
  const project = await requireProjectApiKey(false);

  return NextResponse.json({
    project,
  });
}
