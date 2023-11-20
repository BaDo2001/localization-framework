import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import type { ProjectIncludes } from "../types/project";

type RequireProjectMemberArgs<
  Members extends boolean,
  Translations extends boolean,
> = {
  projectId: string;
  includeMembers: Members;
  includeTranslations: Translations;
};

export const requireProjectMember = async <
  Members extends boolean,
  Translations extends boolean,
>({
  projectId,
  includeMembers,
  includeTranslations,
}: RequireProjectMemberArgs<Members, Translations>): Promise<
  ProjectIncludes<Members, Translations>
> => {
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
      ...(includeTranslations && {
        translations: true,
      }),
    },
  });

  if (!project) {
    return notFound();
  }

  return project as ProjectIncludes<Members, Translations>;
};
