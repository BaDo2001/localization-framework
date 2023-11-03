import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

export const requireProjectOwner = async (projectId: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      ownerId: userId,
    },
  });

  if (!project) {
    return notFound();
  }

  return project;
};
