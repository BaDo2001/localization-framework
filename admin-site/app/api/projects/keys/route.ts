import { type NextRequest, NextResponse } from "next/server";
import * as z from "zod";

import { requireProjectApiKey } from "@/api/utils/requireProjectApiKey";

import { saveNewKey } from "./addKey";

const Body = z.object({
  key: z.string(),
  nativeText: z.string(),
});

/*
POST /api/projects/keys

Body: {
  key: string;
  nativeText: string;
}

Returns: {
  success: true;
}
*/

export async function POST(req: NextRequest) {
  const project = await requireProjectApiKey(true);

  const rawBody = await req.json();

  const body = Body.safeParse(rawBody);

  if (!body.success) {
    return NextResponse.json(body.error, { status: 400 });
  }

  const { key, nativeText } = body.data;

  await saveNewKey({
    project,
    key,
    value: nativeText,
  });

  return NextResponse.json({
    success: true,
  });
}
