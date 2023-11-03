"use server";

import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const generateApiKey = async (projectId: string) => {
  await requireProjectOwner(projectId);

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      apiKey: uuidv4(),
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
