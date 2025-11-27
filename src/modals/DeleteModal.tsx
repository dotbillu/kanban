import React from "react";

interface DeleteModalProps {
  type: string;
  title: string;
  onDeleteBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsDeleteModalOpen?: (value: boolean) => void;
}

function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }: DeleteModalProps) {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        if (setIsDeleteModalOpen) {
          setIsDeleteModalOpen(false);
        }
      }}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >

      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold shadow-md shadow-zinc-300 dark:shadow-zinc-800 max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="font-bold text-red-600 dark:text-red-400 text-xl">
          Delete this {type}?
        </h3>
        {type === "task" ? (
          <p className="text-zinc-500 dark:text-zinc-400 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="flex w-full mt-4 items-center justify-center space-x-4">
          <button
            onClick={onDeleteBtnClick}
            className="w-full items-center text-white hover:opacity-75 bg-red-600 py-2 rounded-full"
          >
            Delete
          </button>
          <button
            onClick={() => {
              if (setIsDeleteModalOpen) {
                setIsDeleteModalOpen(false);
              }
            }}
            className="w-full items-center text-zinc-600 dark:text-zinc-900 dark:bg-zinc-100 hover:opacity-75 bg-zinc-200 dark:bg-zinc-200 py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
