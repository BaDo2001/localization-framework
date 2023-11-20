import { headers } from "next/headers";

import prisma from "@/lib/prisma";

import type { ProjectIncludes } from "../types/project";

export const requireProjectApiKey = async <T extends boolean>(
  includeTranslations: T,
): Promise<ProjectIncludes<false, T>> => {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    throw new Error("Missing Authorization header");
  }

  const apiKey = authHeader.replace("Bearer ", "");

  const project = await prisma.project.findUnique({
    where: { apiKey },
    include: {
      ...(includeTranslations && {
        translations: true,
      }),
    },
  });

  if (!project) {
    throw new Error("Invalid API key");
  }

  return project as ProjectIncludes<false, T>;
};
