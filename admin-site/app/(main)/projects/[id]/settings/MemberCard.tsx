"use client";

import { useTransition } from "react";
import { LuX } from "react-icons/lu";

import { removeMember } from "@/app/api/projects/removeMember";

type Props = {
  projectId: string;
  memberId: string;
  email: string;
  readonly: boolean;
};

const MemberCard: React.FC<Props> = ({
  projectId,
  memberId,
  email,
  readonly,
}) => {
  const modalId = `remove-member-modal-${memberId}`;

  const onOpen = () => {
    const modal = document.getElementById(modalId);
    modal?.showModal?.();
  };

  const onClose = () => {
    const modal = document.getElementById(modalId);
    modal?.close?.();
  };

  const [isPending, startTransition] = useTransition();

  const onRemove = () => {
    startTransition(async () => {
      try {
        await removeMember(projectId, memberId);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center gap-8 w-full px-4 py-2 bg-base-100 rounded-xl">
        <p>{email}</p>

        {!readonly && (
          <button type="button" onClick={onOpen}>
            <LuX className="w-8 h-8 p-1 bg-error text-error-content rounded-full" />
          </button>
        )}
      </div>

      <dialog id={modalId} className="modal">
        <div className="modal-box overflow-visible">
          <h3 className="font-bold text-lg mb-4">
            Are you sure you want to remove this member?
          </h3>

          <p>
            This will remove <strong>{email}</strong> from this project.
          </p>

          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                className="btn btn-outline"
                type="button"
                onClick={onClose}
                disabled={isPending}
              >
                No, keep
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
                  <>Yes, remove</>
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

export default MemberCard;
