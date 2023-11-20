"use server";

import type { Project, Translation } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requireProjectMember } from "@/api/utils/requireProjectMember";
import prisma from "@/lib/prisma";

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
  project: Project & {
    translations: Translation[];
  };
};

export const saveNewKey = async ({ project, key, value }: SaveNewKeyArgs) => {
  await prisma.$transaction(async (tx) => {
    await tx.translationEntry.createMany({
      data: project.translations.map((translation) => ({
        translationId: translation.id,
        key,
        value: translation.language === project.defaultLanguage ? value : null,
      })),
    });
  });

  revalidatePath(`/project/${project.id}/translations/[languages]`);
};
