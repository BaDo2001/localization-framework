"use client";

import CreateProjectForm from "./CreateProjectForm";

const modalId = "create-project-modal";

declare global {
  interface HTMLElement {
    showModal?: () => void;
    close?: () => void;
  }
}

const CreateProjectButton = () => {
  const onOpen = () => {
    const modal = document.getElementById(modalId);
    modal?.showModal?.();
  };

  const onClose = () => {
    const modal = document.getElementById(modalId);
    modal?.close?.();
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onOpen}>
        Create project
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box overflow-visible">
          <h3 className="font-bold text-lg mb-4">Create new project</h3>

          <CreateProjectForm onClose={onClose} />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateProjectButton;
