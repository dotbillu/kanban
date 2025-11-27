import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import data from '../../data.json';
import { Board, Task } from '@/types';

// Initialize with data from JSON
const initialBoards: Board[] = data.boards;

export const boardsAtom = atomWithStorage('kanban-boards', initialBoards);

export const activeBoardAtom = atom((get) => {
  const boards = get(boardsAtom);
  return boards.find(board => board.isActive);
});
export const addBoardAtom = atom(
  null,
  (get, set, { name, newColumns }: { name: string; newColumns: any[] }) => {
    const boards = get(boardsAtom);
    const isActive = boards.length > 0 ? false : true;
    const board: Board = {
      name,
      isActive,
      columns: newColumns,
    };
    set(boardsAtom, [...boards, board]);
  }
);

export const editBoardAtom = atom(
  null,
  (get, set, { name, newColumns }: { name: string; newColumns: any[] }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board) {
      board.name = name;
      board.columns = newColumns;
      set(boardsAtom, [...boards]);
    }
  }
);

export const deleteBoardAtom = atom(
  null,
  (get, set) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board) {
      const newBoards = boards.filter(b => b !== board);
      set(boardsAtom, newBoards);
    }
  }
);

export const setBoardActiveAtom = atom(
  null,
  (get, set, { index }: { index: number }) => {
    const boards = get(boardsAtom);
    const newBoards = boards.map((board, i) => ({
      ...board,
      isActive: i === index
    }));
    set(boardsAtom, newBoards);
  }
);

export const addTaskAtom = atom(
  null,
  (get, set, { title, status, description, subtasks, newColIndex }: {
    title: string;
    status: string;
    description: string;
    subtasks: any[];
    newColIndex: number;
  }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board && board.columns[newColIndex]) {
      const task: Task = { title, description, subtasks, status };
      board.columns[newColIndex].tasks.push(task);
      set(boardsAtom, [...boards]);
    }
  }
);

export const editTaskAtom = atom(
  null,
  (get, set, {
    title,
    status,
    description,
    subtasks,
    prevColIndex,
    newColIndex,
    taskIndex,
  }: {
    title: string;
    status: string;
    description: string;
    subtasks: any[];
    prevColIndex: number;
    newColIndex: number;
    taskIndex: number;
  }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board) {
      const column = board.columns[prevColIndex];
      const task = column.tasks[taskIndex];
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) {
        set(boardsAtom, [...boards]);
        return;
      }
      column.tasks = column.tasks.filter((_, index) => index !== taskIndex);
      const newCol = board.columns[newColIndex];
      newCol.tasks.push(task);
      set(boardsAtom, [...boards]);
    }
  }
);

export const dragTaskAtom = atom(
  null,
  (get, set, { colIndex, prevColIndex, taskIndex }: {
    colIndex: number;
    prevColIndex: number;
    taskIndex: number;
  }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board) {
      const prevCol = board.columns[prevColIndex];
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns[colIndex].tasks.push(task);
      set(boardsAtom, [...boards]);
    }
  }
);

export const setSubtaskCompletedAtom = atom(
  null,
  (get, set, { colIndex, taskIndex, index }: {
    colIndex: number;
    taskIndex: number;
    index: number;
  }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board) {
      const col = board.columns[colIndex];
      const task = col.tasks[taskIndex];
      const subtask = task.subtasks[index];
      subtask.isCompleted = !subtask.isCompleted;
      set(boardsAtom, [...boards]);
    }
  }
);

export const setTaskStatusAtom = atom(
  null,
  (get, set, { colIndex, taskIndex, newColIndex, status }: {
    colIndex: number;
    taskIndex: number;
    newColIndex: number;
    status: string;
  }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board && colIndex !== newColIndex) {
      const columns = board.columns;
      const col = columns[colIndex];
      const task = col.tasks[taskIndex];
      task.status = status;
      col.tasks = col.tasks.filter((_, i) => i !== taskIndex);
      const newCol = columns[newColIndex];
      newCol.tasks.push(task);
      set(boardsAtom, [...boards]);
    }
  }
);

export const deleteTaskAtom = atom(
  null,
  (get, set, { colIndex, taskIndex }: { colIndex: number; taskIndex: number }) => {
    const boards = get(boardsAtom);
    const board = boards.find((board) => board.isActive);
    if (board) {
      const col = board.columns[colIndex];
      col.tasks = col.tasks.filter((_, i) => i !== taskIndex);
      set(boardsAtom, [...boards]);
    }
  }
);
