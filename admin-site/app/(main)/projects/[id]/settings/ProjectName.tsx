"use client";

import type { FC } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import type { Project } from "@prisma/client";

import { updateName } from "@/app/api/projects/updateName";

type Props = {
  project: Project;
  userId: string;
};

type Form = {
  name: string;
};

const ProjectName: FC<Props> = ({ project, userId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm<Form>({
    defaultValues: {
      name: project.name,
    },
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        await updateName(project.id, data.name);
        reset({
          name: data.name,
        });
      } catch (error) {
        if (error instanceof Error) {
          setError("name", {
            type: "custom",
            message: error.message,
          });
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <label className="flex flex-col gap-1">
        <span className="label">Name</span>

        <div className="flex gap-8">
          <input
            type="text"
            placeholder="Name..."
            className="input input-bordered w-80 placeholder:text-base-content read-only:outline-none"
            {...register("name", { required: "Name is required" })}
            readOnly={project.ownerId !== userId}
          />

          {project.ownerId === userId && (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isDirty || isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>Save</>
              )}
            </button>
          )}
        </div>

        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <span className="text-xs text-error">{message}</span>
          )}
        />
      </label>
    </form>
  );
};

export default ProjectName;
