import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

export const requireProjectMember = async (projectId: number) => {
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
  });

  if (!project) {
    return notFound();
  }

  return project;
};
