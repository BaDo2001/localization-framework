import type { FC } from "react";
import { useTransition } from "react";
import { useController, type UseFormReturn } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import type { Project } from "@prisma/client";

import { addKey } from "@/app/api/keys/addKey";
import { getLocaleInfo } from "@/lib/locales";
import type { Plural } from "@/lib/plurals";

import PluralSelector from ".";

export type Form = {
  type: string;
  value: string;
};

type Props = {
  project: Project;
  translationKey: string;
  pluralVersions: Plural[];
  form: UseFormReturn<Form>;
  onClose: () => void;
};

const PluralSelectorForm: FC<Props> = ({
  project,
  translationKey,
  pluralVersions,
  form: {
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    control,
    register,
  },
  onClose,
}) => {
  const { field } = useController({
    name: "type",
    control,
    rules: { required: "Plural type is required" },
  });

  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(({ type, value }) => {
    startTransition(async () => {
      try {
        await addKey({
          projectId: project.id,
          key: translationKey + type,
          value,
        });

        handleClose();
      } catch (error) {
        if (error instanceof Error) {
          setError("type", {
            type: "custom",
            message: error.message,
          });
        }
      }
    });
  });

  return (
    <form className="flex flex-col gap-1 font-normal" onSubmit={onSubmit}>
      <label>
        <span className="label">Plural type</span>

        <PluralSelector
          value={field.value}
          onChange={field.onChange}
          pluralsToExclude={pluralVersions}
        />

        <ErrorMessage
          errors={errors}
          name="type"
          render={({ message }) => (
            <span className="text-xs text-error">{message}</span>
          )}
        />
      </label>

      <div className="flex flex-col gap-1">
        <label htmlFor="value" className="label">
          Value in {getLocaleInfo(project.defaultLanguage)?.name}
        </label>

        <input
          type="text"
          id="value"
          placeholder="Value..."
          className="input input-bordered w-full max-w-xs placeholder:text-base-content"
          {...register("value", { required: "Value is required" })}
        />

        <ErrorMessage
          errors={errors}
          name="value"
          render={({ message }) => (
            <span className="text-xs text-error">{message}</span>
          )}
        />
      </div>

      <div className="modal-action justify-end">
        <button
          type="button"
          className="btn"
          onClick={handleClose}
          disabled={isPending}
        >
          Close
        </button>

        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>Create</>
          )}
        </button>
      </div>
    </form>
  );
};

export default PluralSelectorForm;
