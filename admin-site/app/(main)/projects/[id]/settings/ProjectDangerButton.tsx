"use client";

import type { FC } from "react";
import { useTransition } from "react";

import { useUser } from "@clerk/nextjs";
import type { Project } from "@prisma/client";

import { deleteProject } from "@/app/api/projects/deleteProject";
import { leaveProject } from "@/app/api/projects/leaveProject";

const modalId = "leave-project-modal";

type Props = {
  project: Project;
};

const ProjectDangerButton: FC<Props> = ({ project }) => {
  const { user } = useUser();

  const [isPending, startTransition] = useTransition();

  if (!user) {
    return null;
  }

  const type = project.ownerId === user.id ? "delete" : "leave";

  const onOpen = () => {
    const modal = document.getElementById(modalId);
    modal?.showModal?.();
  };

  const onClose = () => {
    const modal = document.getElementById(modalId);
    modal?.close?.();
  };

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

      <dialog id={modalId} className="modal">
        <div className="modal-box overflow-visible">
          <h3 className="font-bold text-lg mb-4">
            Are you sure you want to {type} this project?
          </h3>

          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                className="btn btn-outline"
                type="button"
                onClick={onClose}
                disabled={isPending}
              >
                {type === "delete" ? "No, keep it" : "No, stay"}
              </button>

              <button
                className="btn btn-error"
                type="button"
                onClick={onAction}
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>{type === "delete" ? "Yes, delete it" : "Yes, leave"}</>
                )}
              </button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
};

export default ProjectDangerButton;
