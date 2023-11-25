import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import type { ProjectIncludes } from "@/api/types/project";
import prisma from "@/lib/prisma";

export const getAllProjects = async <T extends boolean>(
  includeTranslations: T,
): Promise<ProjectIncludes<false, T>[]> => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const projects = await prisma.project.findMany({
    where: {
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
      ...(includeTranslations && {
        translations: true,
      }),
    },
  });

  return projects as ProjectIncludes<false, T>[];
};
