import { headers } from "next/headers";

import type { ProjectIncludes } from "@/api/types/project";
import prisma from "@/lib/prisma";

export class ApiKeyError extends Error {}

export const requireProjectApiKey = async <T extends boolean>(
  includeTranslations: T,
): Promise<ProjectIncludes<false, T>> => {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    throw new ApiKeyError("Missing Authorization header");
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
    throw new ApiKeyError("Invalid API key");
  }

  return project as ProjectIncludes<false, T>;
};
