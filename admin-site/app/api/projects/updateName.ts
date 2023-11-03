"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const updateName = async (projectId: string, newName: string) => {
  await requireProjectOwner(projectId);

  try {
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
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Project name already exists");
    }
  }
};
