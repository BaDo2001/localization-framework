"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaUndo } from "react-icons/fa";

import { saveTranslation } from "@/app/api/keys/saveTranslation";
import type { TranslationEntryPair } from "@/app/api/types/translation";

import UnusedVariableIndicator from "./UnusedVariableIndicator";

type Props = {
  pair: TranslationEntryPair;
  readonly: boolean;
};

type Form = {
  targetValue: string | null;
};

const TranslationEntryPairEditor = ({
  pair: { sourceEntry, targetEntry },
  readonly,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    reset,
  } = useForm<Form>({
    defaultValues: {
      targetValue: targetEntry.value,
    },
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  const handleUndo = () => reset({ targetValue: targetEntry.value });

  const onSubmit = handleSubmit(({ targetValue }) => {
    startTransition(async () => {
      try {
        await saveTranslation({
          projectId: targetEntry.translation.projectId,
          key: targetEntry.key,
          value: targetValue || null,
          language: targetEntry.translation.language,
        });

        reset({
          targetValue,
        });
      } catch (err) {
        console.log(err);
      }
    });
  });

  return (
    <div>
      <h3 className="flex items-center gap-x-2 mb-2 font-semibold">
        {sourceEntry.key}

        <UnusedVariableIndicator
          sourceValue={sourceEntry.value}
          targetValue={targetEntry.value}
        />
      </h3>

      <div className="grid grid-cols-2 bg-base-100 border border-zinc-300 shadow-sm rounded-lg divide-x-2">
        <div className="p-4 break-words">{sourceEntry.value}</div>

        <div className="p-4">
          <form onSubmit={onSubmit}>
            <textarea
              className="resize-none w-full mb-1 h-full focus:p-2 transition-all duration-200 min-h-[100px] rounded-lg focus:outline-zinc-400"
              readOnly={readonly}
              {...register("targetValue")}
            />

            <div className="flex justify-between">
              <div className="flex-1" />

              {!readonly && (
                <>
                  {isDirty && !isPending && (
                    <button
                      type="button"
                      className="btn btn-sm mr-2"
                      onClick={handleUndo}
                    >
                      <FaUndo />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={!isDirty || isPending}
                  >
                    {isPending ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <>Save</>
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TranslationEntryPairEditor;
