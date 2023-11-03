"use server";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const deleteProject = async (projectId: number) => {
  await requireProjectOwner(projectId);

  await prisma.project.deleteMany({
    where: {
      id: projectId,
    },
  });
};
