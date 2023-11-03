"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { createProject } from "@/api/projects/createProject";

const modalId = "create-project-modal";

declare global {
  interface HTMLElement {
    showModal?: () => void;
    close?: () => void;
  }
}

type Form = {
  name: string;
};

const CreateProjectButton = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const [isPending, startTransition] = useTransition();

  const onOpen = () => {
    const modal = document.getElementById(modalId);
    modal?.showModal?.();
  };

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      await createProject(data.name);

      onClose();
    });
  });

  const onClose = () => {
    reset();
    const modal = document.getElementById(modalId);
    modal?.close?.();
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onOpen}>
        Create project
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create new project</h3>

          <form onSubmit={onSubmit}>
            <label className="flex flex-col gap-1">
              <span className="label">Name</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                {...register("name", { required: true })}
              />

              {errors.name && (
                <span className="text-xs text-error">
                  This field is required
                </span>
              )}
            </label>

            <div className="modal-action justify-between mt-10">
              <button
                className="btn"
                type="button"
                onClick={onClose}
                disabled={isPending}
              >
                Close
              </button>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateProjectButton;
