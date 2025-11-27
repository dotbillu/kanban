import React, { useState } from "react";
import { useAtom } from 'jotai';
import Image from 'next/image';
import ElipsisMenu from "../components/ElipsisMenu";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import { activeBoardAtom, setTaskStatusAtom, deleteTaskAtom } from '@/stores/boards';

interface TaskModalProps {
  taskIndex: number;
  colIndex: number;
  setIsTaskModalOpen: (value: boolean) => void;
}

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }: TaskModalProps) {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const [board] = useAtom(activeBoardAtom);
  const [, setTaskStatus] = useAtom(setTaskStatusAtom);
  const [, deleteTask] = useAtom(deleteTaskAtom);

  if (!board) return null;

  const columns = board.columns;
  const col = columns[colIndex];
  if (!col) return null;

  const task = col.tasks[taskIndex];
  if (!task) return null;

  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setTaskStatus({
      taskIndex,
      colIndex,
      newColIndex,
      status,
    });
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLElement).textContent === "Delete") {
      deleteTask({ taskIndex, colIndex });
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold shadow-md shadow-zinc-300 dark:shadow-zinc-800 max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>

          <Image
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src="/icon-vertical-ellipsis.svg"
            width={24} height={24}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        <p className="pt-6 text-zinc-500 dark:text-zinc-400 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-zinc-100 text-zinc-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-zinc-50 dark:bg-zinc-800 focus:border-0 border-[1px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          device="desktop"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
