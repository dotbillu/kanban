import React from "react";
import { useAtom } from 'jotai';
import { activeBoardAtom, setSubtaskCompletedAtom } from '@/stores/boards';

interface SubtaskProps {
  index: number;
  taskIndex: number;
  colIndex: number;
}

function Subtask({ index, taskIndex, colIndex }: SubtaskProps) {
  const [board] = useAtom(activeBoardAtom);
  const [, setSubtaskCompleted] = useAtom(setSubtaskCompletedAtom);

  if (!board) return null;

  const col = board.columns[colIndex];
  if (!col) return null;

  const task = col.tasks[taskIndex];
  if (!task) return null;

  const subtask = task.subtasks[index];
  if (!subtask) return null;

  const checked = subtask.isCompleted;

  const onChange = () => {
    setSubtaskCompleted({ index, taskIndex, colIndex });
  };

  return (
    <div className="w-full flex hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md relative items-center justify-start dark:bg-zinc-800 p-3 gap-4 bg-zinc-100">
      <input
        className="w-4 h-4 accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked ? "line-through opacity-30" : ""}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
