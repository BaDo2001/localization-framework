"use server";

import { auth } from "@clerk/nextjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const createProject = async (name: string, defaultLanguage: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  try {
    await prisma.$transaction(async (tx) => {
      const project = await prisma.project.create({
        data: {
          name,
          ownerId: userId,
          defaultLanguage,
        },
      });

      await tx.translation.create({
        data: {
          language: defaultLanguage,
          projectId: project.id,
        },
      });
    });

    revalidatePath("/");
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Project name already exists");
    }
  }
};
