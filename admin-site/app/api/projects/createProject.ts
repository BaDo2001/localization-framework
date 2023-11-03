"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const createProject = async (name: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  await prisma.project.create({
    data: {
      name,
      ownerId: userId,
    },
  });

  revalidatePath("/");
};
