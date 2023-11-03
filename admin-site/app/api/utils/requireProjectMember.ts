import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

export const requireProjectMember = async (
  projectId: string,
  includeMembers = false,
) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      OR: [
        {
          ownerId: userId,
        },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    include: {
      ...(includeMembers && {
        members: true,
      }),
    },
  });

  if (!project) {
    return notFound();
  }

  return project;
};
