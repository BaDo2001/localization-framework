"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import type { Project } from "@prisma/client";

import { addLanguage } from "@/app/api/projects/addLanguage";
import LanguageSelector from "@/components/LanguageSelector";

type Props = {
  project: Project;
};

type Form = {
  language: string;
};

const AddProjectLanguage: React.FC<Props> = ({ project }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    setError,
    reset,
  } = useForm<Form>();

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        await addLanguage(project.id, data.language);
        reset();
      } catch (error) {
        if (error instanceof Error) {
          setError("language", {
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
        <Controller
          control={control}
          name="language"
          render={({ field: { onChange, value } }) => (
            <div className="w-80">
              <LanguageSelector value={value} onChange={onChange} />
            </div>
          )}
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
        name="language"
        render={({ message }) => (
          <span className="text-xs text-error">{message}</span>
        )}
      />
    </form>
  );
};

export default AddProjectLanguage;
