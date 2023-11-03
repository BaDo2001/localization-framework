import type { FC } from "react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";

import { createProject } from "@/api/projects/createProject";
import LanguageSelector from "@/components/LanguageSelector";

type Props = {
  onClose: () => void;
};

type Form = {
  name: string;
  defaultLanguage: string;
};

const CreateProjectForm: FC<Props> = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
    control,
  } = useForm<Form>();

  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        await createProject(data.name, data.defaultLanguage);

        handleClose();
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
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <label className="flex flex-col gap-1">
        <span className="label">Name</span>

        <input
          type="text"
          placeholder="Name..."
          className="input input-bordered w-full max-w-xs placeholder:text-base-content"
          {...register("name", { required: "Name is required" })}
        />

        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <span className="text-xs text-error">{message}</span>
          )}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="label">Default language</span>

        <Controller
          control={control}
          name="defaultLanguage"
          rules={{ required: "Default language is required" }}
          render={({ field: { onChange, value } }) => (
            <LanguageSelector value={value} onChange={onChange} />
          )}
        />

        <ErrorMessage
          errors={errors}
          name="defaultLanguage"
          render={({ message }) => (
            <span className="text-xs text-error">{message}</span>
          )}
        />
      </label>

      <div className="modal-action justify-between">
        <button
          className="btn"
          type="button"
          onClick={handleClose}
          disabled={isPending}
        >
          Close
        </button>

        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateProjectForm;