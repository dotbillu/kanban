import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from 'jotai';
import Image from 'next/image';
import { activeBoardAtom, addTaskAtom, editTaskAtom } from '@/stores/boards';
import { Subtask } from '@/types';

interface AddEditTaskModalProps {
  type: string;
  device: string;
  setIsAddTaskModalOpen: (value: boolean) => void;
  setIsTaskModalOpen?: (value: boolean) => void;
  taskIndex?: number;
  prevColIndex?: number;
}

function AddEditTaskModal({
  type,
  device,
  setIsAddTaskModalOpen,
  setIsTaskModalOpen,
  taskIndex = 0,
  prevColIndex = 0,
}: AddEditTaskModalProps) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [board] = useAtom(activeBoardAtom);
  const [, addTask] = useAtom(addTaskAtom);
  const [, editTask] = useAtom(editTaskAtom);

  if (!board) return null;

  const columns = board.columns;
  const col = columns[prevColIndex];
  const task = col ? col.tasks[taskIndex] : undefined;

  const [status, setStatus] = useState(columns[prevColIndex]?.name || "");
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ]);

  useEffect(() => {
    if (type === "edit" && isFirstLoad && task) {
      setSubtasks(
        task.subtasks.map((subtask) => ({
          ...subtask,
        }))
      );
      setTitle(task.title);
      setDescription(task.description);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, task]);

  const onChangeSubtasks = (index: number, newValue: string) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      newState[index].title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onDelete = (index: number) => {
    setSubtasks((prevState) => prevState.filter((_, i) => i !== index));
  };

  const onSubmit = (type: string) => {
    if (type === "add") {
      addTask({
        title,
        description,
        subtasks,
        status,
        newColIndex,
      });
    } else {
      editTask({
        title,
        description,
        subtasks,
        status,
        taskIndex,
        prevColIndex,
        newColIndex,
      });
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 dropdown"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 dropdown"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-1 ring-0"
            placeholder="e.g Take coffee break"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-[1px]"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>

          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                onChange={(e) => {
                  onChangeSubtasks(index, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className="bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-[1px]"
                placeholder="e.g Take coffee break"
              />
              <Image
                src="/icon-cross.svg"
                alt="delete subtask"
                width={16} height={16}
                onClick={() => {
                  onDelete(index);
                }}
                className="m-4 cursor-pointer"
              />
            </div>
          ))}

          <button
            className="w-full items-center dark:text-zinc-100 dark:bg-zinc-800 text-zinc-100 bg-zinc-900 py-2 rounded-full"
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-zinc-50 dark:bg-zinc-800 focus:border-0 border-[1px] border-zinc-300 dark:border-zinc-600 focus:outline-zinc-900 dark:focus:outline-zinc-100 outline-none"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                if (type === "edit" && setIsTaskModalOpen) {
                  setIsTaskModalOpen(false);
                }
              }
            }}
            className="w-full items-center text-zinc-100 bg-zinc-900 dark:text-zinc-900 dark:bg-zinc-100 py-2 rounded-full"
          >
            {type === "edit" ? "save edit" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
