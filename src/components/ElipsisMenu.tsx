import React from "react";

interface ElipsisMenuProps {
  type: string;
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}

function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }: ElipsisMenuProps) {
  return (
    <div
      className={
        type === "Boards"
          ? "absolute top-16 right-5"
          : "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md shadow-zinc-300 dark:shadow-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer dark:text-zinc-400 text-zinc-700"
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;
