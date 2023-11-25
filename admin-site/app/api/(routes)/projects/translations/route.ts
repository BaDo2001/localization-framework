import { NextResponse } from "next/server";

import { requireProjectApiKey } from "@/api/utils/requireProjectApiKey";
import { handleError } from "@/app/api/utils/handleError";
import prisma from "@/lib/prisma";
import { formatTranslations } from "@/utils/formatTranslations";

/*
GET /api/projects/translations

Returns: {
  languages: {
    languageCode: string;
    translations: {
      [key: string]: string;
    };
  }[];
}
*/

export async function GET() {
  try {
    const project = await requireProjectApiKey(false);

    const translations = await prisma.translation.findMany({
      where: {
        projectId: project.id,
      },
      include: {
        translationEntries: true,
      },
    });

    return NextResponse.json({
      languages: translations.map((translation) => ({
        languageCode: translation.language,
        ...formatTranslations(translation),
      })),
    });
  } catch (error) {
    return handleError(error);
  }
}
