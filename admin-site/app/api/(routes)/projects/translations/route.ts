import { requireProjectApiKey } from "@/api/utils/requireProjectApiKey";
import prisma from "@/lib/prisma";

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
  const project = await requireProjectApiKey(false);

  const translations = await prisma.translation.findMany({
    where: {
      projectId: project.id,
    },
    include: {
      translationEntries: true,
    },
  });

  return {
    languages: translations.map((translation) => ({
      languageCode: translation.language,
      translations: translation.translationEntries.map((entry) =>
        createNestedObject({}, entry.key.split("."), entry.value),
      ),
    })),
  };
}

export const createNestedObject = <T extends Record<string, unknown>>(
  base: T,
  path: string[],
  value: unknown,
): T => {
  const [head, ...tail] = path;

  if (tail.length === 0) {
    return {
      ...base,
      [head]: value,
    };
  }

  return {
    ...base,
    [head]: createNestedObject(base[head] as T, tail, value),
  };
};
