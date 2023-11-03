"use server";

import { Clerk } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { requireProjectOwner } from "@/api/utils/requireProjectOwner";
import prisma from "@/lib/prisma";

export const addMember = async (projectId: string, email: string) => {
  const project = await requireProjectOwner(projectId);

  const users = await Clerk({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUserList({ emailAddress: [email] });

  if (!users.length) {
    throw new Error("User not found");
  }

  const user = users[0];

  if (user.id === project.ownerId) {
    throw new Error("User is already a member");
  }

  const existingMember = await prisma.member.findFirst({
    where: {
      projectId,
      userId: user.id,
    },
  });

  if (existingMember) {
    throw new Error("User is already a member");
  }

  await prisma.member.create({
    data: {
      projectId,
      userId: users[0].id,
    },
  });

  revalidatePath(`/project/${projectId}/settings`);
};
