"use client";

import { useTransition } from "react";
import { useController, useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import type { Project, Translation } from "@prisma/client";

import { addLanguage } from "@/app/api/projects/addLanguage";
import LanguageSelector from "@/components/LanguageSelector";

type Props = {
  project: Project & {
    translations: Translation[];
  };
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

  const { field } = useController({
    name: "language",
    control,
  });

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
        <div className="w-80">
          <LanguageSelector
            value={field.value}
            onChange={field.onChange}
            keysToExclude={project.translations.map((t) => t.language)}
          />
        </div>

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
