"use server";

import { Clerk } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const addMember = async (projectId: string, email: string) => {
  await requireProjectOwner(projectId);

  const users = await Clerk({}).users.getUserList({ emailAddress: [email] });

  if (!users.length) {
    throw new Error("User not found");
  }

  await prisma.member.create({
    data: {
      projectId,
      userId: users[0].id,
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
