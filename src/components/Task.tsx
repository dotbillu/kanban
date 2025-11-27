import React, { useState } from "react";
import { useAtom } from 'jotai';
import TaskModal from "../modals/TaskModal";
import { activeBoardAtom } from '@/stores/boards';

interface TaskProps {
  colIndex: number;
  taskIndex: number;
}

function Task({ colIndex, taskIndex }: TaskProps) {
  const [board] = useAtom(activeBoardAtom);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  if (!board) return null;

  const columns = board.columns;
  const col = columns[colIndex];
  if (!col) return null;

  const task = col.tasks[taskIndex];
  if (!task) return null;

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded-lg bg-zinc-50 dark:bg-zinc-800 shadow-zinc-300 dark:shadow-zinc-700 py-6 px-3 shadow-lg hover:text-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-100 cursor-pointer"
      >
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="font-bold text-xs tracking-tighter mt-2 text-zinc-500 dark:text-zinc-400">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
