import React, { useState } from "react";
import { useAtom } from 'jotai';
import Image from 'next/image';
import { boardsAtom, setBoardActiveAtom } from '@/stores/boards';
import AddEditBoardModal from "../modals/AddEditBoardModal";

interface SidebarProps {
  setIsBoardModalOpen: (value: boolean) => void;
  isBoardModalOpen: boolean;
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ setIsBoardModalOpen, isSideBarOpen, setIsSideBarOpen }: SidebarProps) {
  const [isBoardModalOpen, setIsBoardModalOpenLocal] = useState(false);

  const [boards] = useAtom(boardsAtom);
  const [, setBoardActive] = useAtom(setBoardActiveAtom);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-zinc-50 dark:bg-zinc-900 fixed top-[72px] h-screen items-center left-0 z-20`
            : `bg-zinc-900 dark:bg-zinc-100 top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>

          {isSideBarOpen && (
            <div className="bg-zinc-50 dark:bg-zinc-900 w-full py-4 rounded-xl">
              <h3 className="dark:text-zinc-300 text-zinc-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="dropdown-borad flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 dark:text-zinc-100 ${
                        board.isActive &&
                        "bg-zinc-900 dark:bg-zinc-100 rounded-r-full text-zinc-100 dark:text-zinc-900 mr-8"
                      } `}
                      key={index}
                      onClick={() => {
                        setBoardActive({ index });
                      }}
                    >
                      <Image src="/icon-board.svg" alt="board icon" width={16} height={16} className="filter-white h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-zinc-600 px-5 py-4 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100"
                    onClick={() => {
                      setIsBoardModalOpenLocal(true);
                    }}
                  >
                    <Image src="/icon-board.svg" alt="board icon" width={16} height={16} className="filter-white h-4" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className="flex items-center absolute bottom-32 text-sm rounded-r-full cursor-pointer mr-2 mb-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 space-x-1 justify-center text-zinc-900 dark:text-zinc-100"
            >
              <p className="text-xs font-medium">Hide Sidebar</p>
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-r-full"
              onClick={() => toggleSidebar()}
            >
              <Image src="/icon-show-sidebar.svg" width={20} height={20} alt="showSidebarIcon" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpenLocal}
        />
      )}
    </div>
  );
}

export default Sidebar;
