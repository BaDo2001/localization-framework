import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

export const getAllProjects = async (includeTranslations = false) => {
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

  return projects;
};
