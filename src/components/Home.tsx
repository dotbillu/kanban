import React, { useEffect, useState } from "react";
import { useAtom } from 'jotai';
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import { activeBoardAtom } from '@/stores/boards';

interface HomeProps {
  setIsBoardModalOpen: (value: boolean) => void;
  isBoardModalOpen: boolean;
}

function Home({ setIsBoardModalOpen, isBoardModalOpen }: HomeProps) {
  const [windowSize, setWindowSize] = useState([
    typeof window !== 'undefined' ? window.innerWidth : 768,
    typeof window !== 'undefined' ? window.innerHeight : 1024,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  const [board] = useAtom(activeBoardAtom);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  if (!board) return null;

  const columns = board.columns;

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? "bg-zinc-50 scrollbar-hide h-screen flex dark:bg-zinc-950 overflow-x-scroll gap-6 ml-[261px]"
          : "bg-zinc-50 scrollbar-hide h-screen flex dark:bg-zinc-950 overflow-x-scroll gap-6"
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
            }}
            className="h-screen dark:bg-zinc-800/50 flex justify-center items-center font-bold text-2xl hover:text-zinc-900 transition duration-300 cursor-pointer bg-zinc-100 scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-zinc-500 mt-[135px] rounded-lg dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            + New Column
          </div>
        </>
      ) : (
        <EmptyBoard type="edit" />
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
