import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useAtom } from 'jotai';
import Task from "./Task";
import { activeBoardAtom, dragTaskAtom } from '@/stores/boards';

interface ColumnProps {
  colIndex: number;
}

function Column({ colIndex }: ColumnProps) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const [color, setColor] = useState<string | null>(null);
  const [board] = useAtom(activeBoardAtom);
  const [, dragTask] = useAtom(dragTaskAtom);

  useEffect(() => {
    setColor(shuffle(colors).pop() || null);
  }, []);

  if (!board) return null;

  const col = board.columns[colIndex];
  if (!col) return null;

  const handleOnDrop = (e: React.DragEvent) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dragTask({ colIndex, prevColIndex, taskIndex });
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-zinc-500 dark:text-zinc-400">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col.tasks.length})
      </div>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
