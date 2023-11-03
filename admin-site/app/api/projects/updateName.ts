"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const updateName = async (projectId: number, newName: string) => {
  await requireProjectOwner(projectId);

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: newName,
    },
  });

  revalidatePath("/");
  revalidatePath(`/project/${projectId}`);
  revalidatePath(`/project/${projectId}/settings`);
};
