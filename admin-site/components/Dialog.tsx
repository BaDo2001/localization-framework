import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  id: string;
  onClose?: () => void;
  onAction?: () => void;
  isPending?: boolean;
}>;

const Dialog: React.FC<Props> = ({
  id,
  onAction,
  onClose,
  isPending,
  children,
}) => (
  <dialog id={id} className="modal">
    <div className="modal-box overflow-visible">
      {children}

      {onAction && onClose && (
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
              onClick={onAction}
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
      )}
    </div>

    <form method="dialog" className="modal-backdrop" onSubmit={onClose}>
      <button type="submit">close</button>
    </form>
  </dialog>
);

export default Dialog;
