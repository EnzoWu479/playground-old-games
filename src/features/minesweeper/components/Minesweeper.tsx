"use client";

import { PropsWithChildren, useState } from "react";
import { Game, GameConfig } from "../types/Game";
import { useGame } from "../hooks/useGame";
import { MineBlock } from "./MineBlock";
import { Button } from "@/components/ui/button";
import { hourConversion, hourFormated } from "@/features/timer";
import { Scoreboard } from "./Scoreboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MineBoard } from "./MineBoard";
import { Menu } from "./Menu";
import { RecordForm } from "./RecordForm";
import { GameStatus } from "../types/GameStatus";

interface Props extends PropsWithChildren<{}> {
  config: GameConfig;
}

export const Minesweeper = ({ children, config }: Props) => {
  const { game, reveal, flag, time, status, reset } = useGame(config);

  const timeFormated = hourFormated(time);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <span>{timeFormated}</span>
      </div>
      <div className="relative">
        <MineBoard
          blocks={game.blocks}
          flag={flag}
          reveal={reveal}
          finished={status === GameStatus.WON || status === GameStatus.LOST}
          reset={() => reset()}
        />
      </div>
      {/* <RecordForm time={time} /> */}
      {status === GameStatus.WON && (
        <RecordForm
          config={{ rows: game.rows, columns: game.columns, mines: game.mines }}
          time={time}
        />
      )}
      {children}
    </div>
  );
};
