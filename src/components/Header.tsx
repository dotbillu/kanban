import React, { useState } from "react";
import { useAtom } from 'jotai';
import Image from 'next/image';
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { boardsAtom, deleteBoardAtom, setBoardActiveAtom } from '@/stores/boards';
import DeleteModal from "../modals/DeleteModal";

interface HeaderProps {
  setIsBoardModalOpen: (value: boolean) => void;
  isBoardModalOpen: boolean;
}

function Header({ setIsBoardModalOpen, isBoardModalOpen }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [boards] = useAtom(boardsAtom);
  const [, deleteBoard] = useAtom(deleteBoardAtom);
  const [, setBoardActive] = useAtom(setBoardActiveAtom);

  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLElement).textContent === "Delete") {
      deleteBoard();
      setBoardActive({ index: 0 });
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  if (!board) return null;

  return (
    <div className="p-4 fixed left-0 bg-zinc-50 dark:bg-zinc-900 z-50 right-0">
      <header className="flex justify-between dark:text-zinc-100 text-zinc-900 items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Image src="/logo-mobile.svg" alt="Logo" width={24} height={24} className="h-6 w-6" />
          <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
            kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
            <Image
              src={openDropdown ? "/icon-chevron-up.svg" : "/icon-chevron-down.svg"}
              alt="dropdown icon"
              width={12} height={12}
              className="w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="button hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>

          <Image
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src="/icon-vertical-ellipsis.svg"
            alt="elipsis"
            width={24} height={24}
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
