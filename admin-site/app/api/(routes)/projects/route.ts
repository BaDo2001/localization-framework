import { NextResponse } from "next/server";

import { requireProjectApiKey } from "@/api/utils/requireProjectApiKey";
import { handleError } from "@/app/api/utils/handleError";

/*
GET /api/projects

Returns: {
  project: Project
}
*/

export async function GET() {
  try {
    const project = await requireProjectApiKey(false);

    return NextResponse.json({
      project,
    });
  } catch (error) {
    return handleError(error);
  }
}
