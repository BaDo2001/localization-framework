"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const addLanguage = async (projectId: string, newLanguage: string) => {
  await requireProjectOwner(projectId);

  await prisma.translation.create({
    data: {
      projectId,
      language: newLanguage,
    },
  });

  // TODO: Copy translations from default language

  revalidatePath(`/project/${projectId}/settings`);
};
