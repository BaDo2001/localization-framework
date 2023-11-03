"use server";

import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const removeMember = async (projectId: number, memberId: number) => {
  await requireProjectOwner(projectId);

  await prisma.member.deleteMany({
    where: {
      id: memberId,
      projectId,
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
