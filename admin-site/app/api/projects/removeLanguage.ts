"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const removeLanguage = async (
  projectId: number,
  translationId: number,
) => {
  const project = await requireProjectOwner(projectId);

  const translation = await prisma.translation.findUnique({
    where: {
      id: translationId,
    },
  });

  if (!translation) {
    throw new Error("Translation not found");
  }

  if (translation.language === project.defaultLanguage) {
    throw new Error("Cannot remove default language");
  }

  await prisma.translation.deleteMany({
    where: {
      projectId,
      id: translationId,
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
