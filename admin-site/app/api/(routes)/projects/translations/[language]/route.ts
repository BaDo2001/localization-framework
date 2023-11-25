import { NextResponse } from "next/server";

import { handleError } from "@/app/api/utils/handleError";
import { requireProjectApiKey } from "@/app/api/utils/requireProjectApiKey";
import prisma from "@/lib/prisma";
import { formatTranslations } from "@/utils/formatTranslations";

/*
GET /api/projects/translations/{language}

Returns: {
  translations: {
    [key: string]: string;
  };
}

*/

export async function GET(
  _request: Request,
  { params }: { params: { language: string } },
) {
  try {
    const project = await requireProjectApiKey(false);

    const translation = await prisma.translation.findUnique({
      where: {
        projectId_language: {
          projectId: project.id,
          language: params.language,
        },
      },
      include: {
        translationEntries: true,
      },
    });

    if (!translation) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(formatTranslations(translation));
  } catch (error) {
    return handleError(error);
  }
}
