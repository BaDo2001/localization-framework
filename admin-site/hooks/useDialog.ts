declare global {
  interface HTMLElement {
    showModal?: () => void;
    close?: () => void;
  }
}

export const useDialog = (modalId: string) => {
  const onOpen = () => {
    const modal = document.getElementById(modalId);
    modal?.showModal?.();
  };

  const onClose = () => {
    const modal = document.getElementById(modalId);
    modal?.close?.();
  };

  return { onOpen, onClose };
};
