"use server";

import { requireProjectMember } from "@/api/utils/requireProjectMember";
import prisma from "@/lib/prisma";

type SaveTranslationArgs = {
  projectId: string;
  key: string;
  value: string;
  language: string;
};

export const saveTranslation = async ({
  projectId,
  key,
  value,
  language,
}: SaveTranslationArgs) => {
  await requireProjectMember({
    projectId,
    includeTranslations: false,
    includeMembers: false,
  });

  const translation = await prisma.translation.findUnique({
    where: {
      projectId_language: {
        projectId,
        language,
      },
    },
  });

  if (!translation) {
    throw new Error("Translation not found");
  }

  await prisma.translationEntry.update({
    where: {
      translationId_key: {
        translationId: translation.id,
        key,
      },
    },
    data: {
      value,
    },
  });
};
