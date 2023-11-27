"use server";

import { revalidatePath } from "next/cache";

import { requireProjectMember } from "@/api/utils/requireProjectMember";
import prisma from "@/lib/prisma";

import type { ProjectWithTranslations } from "../types/project";

type AddKeyArgs = {
  projectId: string;
  key: string;
  value: string;
};

export const addKey = async ({ projectId, key, value }: AddKeyArgs) => {
  const project = await requireProjectMember({
    projectId,
    includeMembers: false,
    includeTranslations: true,
  });

  await saveNewKey({
    project,
    key,
    value,
  });
};

type SaveNewKeyArgs = Omit<AddKeyArgs, "projectId"> & {
  project: ProjectWithTranslations;
};

export const saveNewKey = async ({ project, key, value }: SaveNewKeyArgs) => {
  await prisma.$transaction(async (tx) => {
    const currentEntries = await tx.translationEntry.findMany({
      where: {
        translation: {
          projectId: project.id,
          language: project.defaultLanguage,
        },
      },
    });

    const conflictingKeys = currentEntries.filter((entry) => {
      if (entry.key === key) {
        return true;
      }

      if (entry.key.startsWith(`${key}.`)) {
        return true;
      }

      if (key.startsWith(`${entry.key}.`)) {
        return true;
      }

      return false;
    });

    if (conflictingKeys.length > 0) {
      throw new Error("Key already exists");
    }

    await tx.translationEntry.createMany({
      data: project.translations.map((translation) => ({
        translationId: translation.id,
        key,
        value: translation.language === project.defaultLanguage ? value : null,
      })),
    });
  });

  revalidatePath(`/project/${project.id}/translations/[languages]`, "page");
};
