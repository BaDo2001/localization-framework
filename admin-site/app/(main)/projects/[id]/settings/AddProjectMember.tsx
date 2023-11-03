"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Project } from "@prisma/client";
import * as z from "zod";

import { addMember } from "@/app/api/projects/addMember";

type Props = {
  project: Project;
};

const FormSchema = z.object({
  email: z.string().email(),
});

type Form = z.infer<typeof FormSchema>;

const AddProjectMember: React.FC<Props> = ({ project }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setError,
    reset,
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        await addMember(project.id, data.email);
        reset();
      } catch (error) {
        if (error instanceof Error) {
          setError("email", {
            type: "custom",
            message: error.message,
          });
        }
      }
    });
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-8">
        <input
          type="email"
          placeholder="Email..."
          className="input input-bordered w-80 placeholder:text-base-content"
          {...register("email", { required: "Email is required" })}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isPending || !isValid}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>Add</>
          )}
        </button>
      </div>

      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <>
            {message !== "Invalid email" && (
              <span className="text-xs text-error">{message}</span>
            )}
          </>
        )}
      />
    </form>
  );
};

export default AddProjectMember;
