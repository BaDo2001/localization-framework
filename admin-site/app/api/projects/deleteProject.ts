"use server";

import { redirect, RedirectType } from "next/navigation";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const deleteProject = async (projectId: string) => {
  await requireProjectOwner(projectId);

  await prisma.project.deleteMany({
    where: {
      id: projectId,
    },
  });

  redirect("/", RedirectType.replace);
};
