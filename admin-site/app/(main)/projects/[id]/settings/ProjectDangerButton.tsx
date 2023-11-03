"use client";

import type { FC } from "react";
import { useTransition } from "react";

import type { Project } from "@prisma/client";

import { deleteProject } from "@/app/api/projects/deleteProject";
import { leaveProject } from "@/app/api/projects/leaveProject";
import Dialog from "@/components/Dialog";
import { useDialog } from "@/hooks/useDialog";

type Props = {
  project: Project;
  readonly: boolean;
};

const ProjectDangerButton: FC<Props> = ({ project, readonly }) => {
  const modalId = `project-danger-modal-${project.id}`;

  const [isPending, startTransition] = useTransition();

  const type = readonly ? "leave" : "delete";

  const { onOpen, onClose } = useDialog(modalId);

  const onAction = () => {
    startTransition(async () => {
      try {
        if (type === "delete") {
          await deleteProject(project.id);
        } else {
          await leaveProject(project.id);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <button type="button" className="btn btn-error" onClick={onOpen}>
        {type === "delete" ? "Delete project" : "Leave project"}
      </button>

      <Dialog
        id={modalId}
        isPending={isPending}
        onAction={onAction}
        onClose={onClose}
      >
        <h3 className="font-bold text-lg mb-4">
          Are you sure you want to {type} this project?
        </h3>

        <p>
          This action is irreversible.{" "}
          {type === "delete"
            ? " All project data will be permanently deleted."
            : "You will no longer have access to this project."}
        </p>
      </Dialog>
    </>
  );
};

export default ProjectDangerButton;
