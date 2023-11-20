"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const addLanguage = async (projectId: string, newLanguage: string) => {
  await requireProjectOwner(projectId);

  await prisma.$transaction(async (tx) => {
    const newTranslation = await prisma.translation.create({
      data: {
        projectId,
        language: newLanguage,
      },
    });

    const project = (await tx.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        defaultLanguage: true,
        translations: true,
      },
    }))!;

    const defaultLanguageTranslationEntries =
      await tx.translationEntry.findMany({
        where: {
          id: project.translations.find(
            (translation) => translation.language === project.defaultLanguage,
          )?.id,
        },
      });

    await tx.translationEntry.createMany({
      data: defaultLanguageTranslationEntries.map((translationEntry) => ({
        translationId: newTranslation.id,
        key: translationEntry.key,
        value: null,
      })),
    });
  });

  revalidatePath(`/project/${projectId}/settings`);
};
