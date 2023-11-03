"use client";

import type { FC } from "react";
import React, { useTransition } from "react";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";

import { useUser } from "@clerk/nextjs";
import type { Project } from "@prisma/client";
import { useCopyToClipboard } from "usehooks-ts";

import { generateApiKey } from "@/api/projects/generateApiKey";

type Props = {
  project: Project;
};

const ProjectApiKey: FC<Props> = ({ project }) => {
  const [value, copy] = useCopyToClipboard();

  const [isPending, startTransition] = useTransition();

  const { user } = useUser();

  if (!user) {
    return null;
  }

  const onCopy = () => {
    copy(project.apiKey!);
  };

  const onGenerate = () => {
    startTransition(async () => {
      try {
        await generateApiKey(project.id);

        copy("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="flex gap-8">
      <button
        type="button"
        className="btn"
        disabled={!project.apiKey}
        onClick={onCopy}
      >
        {project.apiKey ? project.apiKey : "No API key generated"}

        {project.apiKey && (
          <>
            {value ? (
              <LuClipboardCheck
                className="ml-2 w-6 h-6"
                style={{ verticalAlign: "middle" }}
              />
            ) : (
              <LuClipboard
                className="ml-2 w-6 h-6"
                style={{ verticalAlign: "middle" }}
              />
            )}
          </>
        )}
      </button>

      <button
        type="button"
        className="btn btn-outline"
        onClick={onGenerate}
        disabled={isPending || project.ownerId !== user.id}
      >
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <> {project.apiKey ? "Regenerate" : "Generate"}</>
        )}
      </button>
    </div>
  );
};

export default ProjectApiKey;
