import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

interface EmptyBoardProps {
  type: string;
}

function EmptyBoard({ type }: EmptyBoardProps) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-zinc-500 dark:text-zinc-400 font-bold">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-zinc-900 dark:bg-zinc-100 mt-8 relative text-zinc-100 bg-zinc-900 py-2 rounded-full"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
