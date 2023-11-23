import prisma from "@/lib/prisma";

import type { TranslationEntryPair } from "../types/translation";
import { requireProjectMember } from "../utils/requireProjectMember";

type GetTranslationEntryPairsArgs = {
  projectId: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export const getTranslationEntryPairs = async ({
  projectId,
  sourceLanguage,
  targetLanguage,
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

  const sourceEntries = await prisma.translationEntry.findMany({
    where: {
      translationId: sourceTranslation.id,
    },
  });

  const targetEntries = await prisma.translationEntry.findMany({
    where: {
      translationId: targetTranslation.id,
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
