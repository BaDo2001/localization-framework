"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

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

  redirect("/", RedirectType.replace);
};
