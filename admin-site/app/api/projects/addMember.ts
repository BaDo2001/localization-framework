"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const addMember = async (projectId: number, newMember: string) => {
  await requireProjectOwner(projectId);

  await prisma.member.create({
    data: {
      projectId,
      userId: newMember,
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
