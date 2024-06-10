import {
  Minesweeper,
  MinesweeperMenu,
  MinesweeperScoreboard,
} from "@/features/minesweeper";
import Image from "next/image";
import { Suspense } from "react";

const DEFAULT_ROWS = 10;
const DEFAULT_COLUMNS = 10;
const DEFAULT_MINES = 10;

interface PageProps {
  searchParams: {
    rows?: string;
    columns?: string;
    mines?: string;
  };
}

export default function Home({ searchParams }: PageProps) {
  const config = {
    rows: searchParams.rows ? Number(searchParams.rows) : DEFAULT_ROWS,
    columns: searchParams.columns
      ? Number(searchParams.columns)
      : DEFAULT_COLUMNS,
    mines: searchParams.mines ? Number(searchParams.mines) : DEFAULT_MINES,
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center mb-8">Minesweeper</h1>
        <MinesweeperMenu config={config} />
        <Minesweeper config={config}>
          <Suspense fallback="Loading...">
            <MinesweeperScoreboard config={config} />
          </Suspense>
        </Minesweeper>
      </div>
    </main>
  );
}
