'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { boardsAtom, setBoardActiveAtom } from '@/stores/boards';
import Header from '@/components/Header';
import Home from '@/components/Home';
import EmptyBoard from '@/components/EmptyBoard';

export default function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [boards] = useAtom(boardsAtom);
  const [, setBoardActive] = useAtom(setBoardActiveAtom);

  const activeBoard = boards.find((board) => board.isActive);

  useEffect(() => {
    if (!activeBoard && boards.length > 0) {
      setBoardActive({ index: 0 });
    }
  }, [activeBoard, boards, setBoardActive]);

  return (
    <div className="overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
          <Home
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}
