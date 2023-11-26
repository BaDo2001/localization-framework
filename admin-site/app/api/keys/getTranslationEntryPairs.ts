import { parseBooleanQueryParam } from "@/lib/params";
import prisma from "@/lib/prisma";

import type { KeyFilter, TranslationEntryPair } from "../types/translation";
import { requireProjectMember } from "../utils/requireProjectMember";

type GetTranslationEntryPairsArgs = {
  projectId: string;
  sourceLanguage: string;
  targetLanguage: string;
  filter: KeyFilter;
};

export const getTranslationEntryPairs = async ({
  projectId,
  sourceLanguage,
  targetLanguage,
  filter,
}: GetTranslationEntryPairsArgs) => {
  const project = await requireProjectMember({
    projectId,
    includeMembers: false,
    includeTranslations: true,
  });

  const sourceTranslation = project.translations.find(
    (t) => t.language === sourceLanguage,
  );

  const targetTranslation = project.translations.find(
    (t) => t.language === targetLanguage,
  );

  if (!sourceTranslation || !targetTranslation) {
    throw new Error("Invalid language pair");
  }

  const targetEntries = await prisma.translationEntry.findMany({
    where: {
      AND: [
        { translationId: targetTranslation.id },
        {
          ...(filter.query && {
            key: {
              contains: filter.query,
              mode: "insensitive",
            },
          }),
        },
        {
          ...(parseBooleanQueryParam(filter.emptyOnly) && {
            value: null,
          }),
        },
        {
          ...(filter.group && {
            key: {
              startsWith: filter.group,
            },
          }),
        },
      ],
    },
    orderBy: {
      key: "asc",
    },
  });

  const sourceEntries = await prisma.translationEntry.findMany({
    where: {
      translationId: sourceTranslation.id,
      key: {
        in: targetEntries.map((entry) => entry.key),
      },
    },
    orderBy: {
      key: "asc",
    },
  });

  const pairs: TranslationEntryPair[] = sourceEntries.map((sourceEntry) => {
    const targetEntry = targetEntries.find(
      (entry) => entry.key === sourceEntry.key,
    )!;

    return {
      sourceEntry: { ...sourceEntry, translation: sourceTranslation },
      targetEntry: { ...targetEntry, translation: targetTranslation },
    };
  });

  return pairs;
};
