import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";

export const requireProjectOwner = async (projectId: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== userId) {
    throw new Error("Not authorized");
  }

  return project;
};
