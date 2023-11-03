"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const leaveProject = async (projectId: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  await prisma.member.deleteMany({
    where: {
      userId,
      projectId,
    },
  });

  revalidatePath("/");
};
