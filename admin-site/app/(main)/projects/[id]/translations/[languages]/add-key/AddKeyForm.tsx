import { type FC, useTransition } from "react";
import type { UseFormReturn } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";

import { addKey } from "@/app/api/keys/addKey";

export type Form = {
  key: string;
  value: string;
};

type Props = {
  projectId: string;
  onClose: () => void;
  form: UseFormReturn<Form>;
};

const AddKeyForm: FC<Props> = ({
  projectId,
  onClose,
  form: {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
  },
}) => {
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(({ key, value }) => {
    startTransition(async () => {
      try {
        await addKey({ projectId, key, value });

        handleClose();
      } catch (error) {
        if (error instanceof Error) {
          setError("key", {
            type: "custom",
            message: error.message,
          });
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="key" className="label">
          Key
        </label>

        <input
          type="text"
          id="key"
          placeholder="Key..."
          className="input input-bordered w-full max-w-xs placeholder:text-base-content"
          {...register("key", { required: "Key is required" })}
        />

        <ErrorMessage
          errors={errors}
          name="key"
          render={({ message }) => (
            <span className="text-xs text-error">{message}</span>
          )}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="value" className="label">
          Value
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

export default AddKeyForm;
