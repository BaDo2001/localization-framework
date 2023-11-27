import prisma from "@/lib/prisma";

import type { TranslationWithEntries } from "../types/translation";
import { requireProjectMember } from "../utils/requireProjectMember";

export const getDefaultTranslation = async (projectId: string) => {
  const project = await requireProjectMember({
    projectId,
    includeMembers: false,
    includeTranslations: false,
  });

  const defaultTranslation = await prisma.translation.findUnique({
    where: {
      projectId_language: {
        projectId: project.id,
        language: project.defaultLanguage,
      },
    },
    include: {
      translationEntries: {
        orderBy: {
          key: "asc",
        },
      },
    },
  });

  if (!defaultTranslation) {
    throw new Error("Translation not found");
  }

  return defaultTranslation as TranslationWithEntries;
};
