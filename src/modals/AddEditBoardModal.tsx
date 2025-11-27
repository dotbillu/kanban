import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from 'jotai';
import Image from 'next/image';
import { activeBoardAtom, addBoardAtom, editBoardAtom } from '@/stores/boards';
import { Column } from '@/types';

interface AddEditBoardModalProps {
  setIsBoardModalOpen: (value: boolean) => void;
  type: string;
  setBoardType?: (type: string) => void;
}

function AddEditBoardModal({ setIsBoardModalOpen, type, setBoardType }: AddEditBoardModalProps) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState<Column[]>([
    { name: "Todo", tasks: [] },
    { name: "Doing", tasks: [] },
  ]);
  const [isValid, setIsValid] = useState(true);

  const [board] = useAtom(activeBoardAtom);
  const [, addBoard] = useAtom(addBoardAtom);
  const [, editBoard] = useAtom(editBoardAtom);

  useEffect(() => {
    if (type === "edit" && isFirstLoad && board) {
      setNewColumns(
        board.columns.map((col) => ({
          ...col,
        }))
      );
      setName(board.name);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, board]);

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (index: number, newValue: string) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      newState[index].name = newValue;
      return newState;
    });
  };

  const onDelete = (index: number) => {
    setNewColumns((prevState) => prevState.filter((_, i) => i !== index));
  };

  const onSubmit = (type: string) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      addBoard({ name, newColumns });
    } else {
      editBoard({ name, newColumns });
    }
  };

  return (
    <div
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold shadow-md shadow-zinc-300 dark:shadow-zinc-800 max-w-md mx-auto my-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-zinc-100 text-zinc-500">
            Board Name
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-1 ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-zinc-100 text-zinc-500">
            Board Columns
          </label>

          {newColumns.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-[1px]"
                onChange={(e) => {
                  onChange(index, e.target.value);
                }}
                type="text"
                value={column.name}
              />
              <Image
                src="/icon-cross.svg"
                alt="delete column"
                width={16} height={16}
                onClick={() => {
                  onDelete(index);
                }}
                className="m-4 cursor-pointer"
              />
            </div>
          ))}
          <div>
            <button
              className="w-full items-center hover:opacity-70 dark:text-zinc-900 dark:bg-zinc-100 text-zinc-100 bg-zinc-900 py-2 rounded-full"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [] },
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              className="w-full items-center hover:opacity-70 dark:text-zinc-900 dark:bg-zinc-100 mt-8 relative text-zinc-100 bg-zinc-900 py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
