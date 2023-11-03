"use client";

import { useTransition } from "react";
import { LuX } from "react-icons/lu";

import type { Translation } from "@prisma/client";
import Image from "next/image";

import { removeLanguage } from "@/app/api/projects/removeLanguage";
import { isLocaleKey, locales } from "@/lib/locales";

type Props = {
  projectId: string;
  defaultLanguage: string;
  translation: Translation;
  readonly: boolean;
};

const LanguageCard: React.FC<Props> = ({
  projectId,
  defaultLanguage,
  translation,
  readonly,
}) => {
  const modalId = `remove-language-modal-${translation.id}`;

  const [isPending, startTransition] = useTransition();

  const languageKey = translation.language;

  if (!isLocaleKey(languageKey)) {
    return null;
  }

  const onOpen = () => {
    const modal = document.getElementById(modalId);
    modal?.showModal?.();
  };

  const onClose = () => {
    const modal = document.getElementById(modalId);
    modal?.close?.();
  };

  const onRemove = () => {
    startTransition(async () => {
      try {
        await removeLanguage(projectId, translation.id);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const localeInfo = locales[languageKey];

  return (
    <>
      <div className="flex items-center w-60 px-4 py-2 bg-base-100 rounded-xl">
        <Image
          src={localeInfo.flag}
          alt={localeInfo.name}
          className="border border-zinc-300 mr-2"
          width={32}
          height={32}
          style={{
            width: "auto",
            height: 20,
          }}
        />

        <p className="flex-1">{localeInfo.name}</p>

        {languageKey === defaultLanguage ? (
          <span className="badge badge-accent h-8">Default</span>
        ) : (
          <>
            {!readonly && (
              <button type="button" onClick={onOpen}>
                <LuX className="w-8 h-8 p-1 bg-error text-error-content rounded-full" />
              </button>
            )}
          </>
        )}
      </div>

      <dialog id={modalId} className="modal">
        <div className="modal-box overflow-visible">
          <h3 className="font-bold text-lg mb-4">
            Are you sure you want to remove this language?
          </h3>

          <p>
            This will remove <strong>{localeInfo.name}</strong> from this
            project.
          </p>

          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                className="btn btn-outline"
                type="button"
                onClick={onClose}
                disabled={isPending}
              >
                No, keep it
              </button>

              <button
                className="btn btn-error"
                type="button"
                onClick={onRemove}
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>Yes, remove it</>
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

export default LanguageCard;
