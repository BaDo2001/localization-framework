"use server";

import { revalidatePath } from "next/cache";

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

  await prisma.translationEntry.upsert({
    where: {
      translationId_key: {
        translationId: translation.id,
        key,
      },
    },
    create: {
      translationId: translation.id,
      key,
      value,
    },
    update: {
      value,
    },
  });

  revalidatePath(`projects/${projectId}/translations/[languages]`);
};
