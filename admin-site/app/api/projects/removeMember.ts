"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const removeMember = async (projectId: string, memberId: string) => {
  await requireProjectOwner(projectId);

  await prisma.member.deleteMany({
    where: {
      id: memberId,
      projectId,
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
