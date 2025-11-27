import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAtom } from 'jotai';
import Image from 'next/image';
import useDarkMode from "../hooks/useDarkMode";
import { boardsAtom, setBoardActiveAtom } from '@/stores/boards';

interface HeaderDropDownProps {
  setOpenDropdown: (value: boolean) => void;
  setIsBoardModalOpen: (value: boolean) => void;
}

function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }: HeaderDropDownProps) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [boards] = useAtom(boardsAtom);
  const [, setBoardActive] = useAtom(setBoardActiveAtom);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 dropdown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >

      <div className="bg-zinc-50 dark:bg-zinc-900 shadow-md shadow-zinc-300 dark:shadow-zinc-800 w-full py-4 rounded-xl">
              <h3 className="dark:text-zinc-300 text-zinc-600 font-semibold mx-4 mb-8">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className="dropdown-borad">
          {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 py-4 ${
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
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="flex items-baseline space-x-2 text-zinc-600 dark:text-zinc-300 px-5 py-4"
          >
            <Image src="/icon-board.svg" alt="board icon" width={16} height={16} className="filter-white h-4" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>

          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <Image src="/icon-light-theme.svg" width={20} height={20} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-zinc-900" : "bg-zinc-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <Image src="/icon-dark-theme.svg" width={20} height={20} alt="moon indicating dark mode" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
