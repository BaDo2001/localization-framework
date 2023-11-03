"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const removeLanguage = async (
  projectId: string,
  translationId: string,
) => {
  const project = await requireProjectOwner(projectId);

  await prisma.translation.deleteMany({
    where: {
      projectId,
      id: translationId,
      NOT: {
        language: project.defaultLanguage,
      },
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
