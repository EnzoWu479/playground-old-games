import { useEffect, useState } from "react";
import { Game, GameConfig } from "../types/Game";
import { Block } from "../types/Block";
import { generateBlocks } from "../utils/gameBuild";
import { hasWon, revealBlock } from "../utils/behavior";
import { GameStatus } from "../types/GameStatus";
import { useSound, SoundTypes } from "@/features/sound";
import { useTimer } from "@/features/timer";

type GameRequest = {
  rows: number;
  columns: number;
  mines: number;
};

export const useGame = ({ columns, mines, rows }: GameConfig) => {
  const { play } = useSound();
  const timer = useTimer();
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [game, setGame] = useState<Game>({
    id: "",
    blocks: [],
    columns: 0,
    mines: 0,
    rows: 0,
  });

  const buildGame = (game: GameRequest) => {
    const blocks = generateBlocks({
      columns: game.columns,
      mines: game.mines,
      rows: game.rows,
    });
    setGame({
      id: crypto.randomUUID(),
      blocks,
      columns: game.columns,
      mines: game.mines,
      rows: game.rows,
    });
  };

  const reveal = (x: number, y: number) => {
    if (status === GameStatus.IDLE) {
      timer.start();
      setStatus(GameStatus.PLAYING);
    } else if (status !== GameStatus.PLAYING) return;

    const _blocks = revealBlock({
      row: x,
      column: y,
      blocks: game.blocks,
    });
    setGame({
      ...game,
      blocks: _blocks,
    });
    if (hasWon(_blocks)) win();
    if (_blocks[x][y].isMine) lose();
  };

  const flag = (x: number, y: number) => {
    if (status !== GameStatus.PLAYING) return;
    const _blocks = [...game.blocks];
    const block = _blocks[x][y];
    if (block.revealed) {
      return;
    }

    block.flagged = !block.flagged;
    setGame({
      ...game,
      blocks: _blocks,
    });
  };

  const reset = () => {
    timer.reset();
    setStatus(GameStatus.IDLE);
    buildGame({
      columns: game.columns,
      mines: game.mines,
      rows: game.rows,
    });
  };

  const win = () => {
    setStatus(GameStatus.WON);
    timer.stop();
    play("win");
  };
  const lose = () => {
    setStatus(GameStatus.LOST);
    timer.stop();
    play("explosion");
  };

  const endGame = () => {
    setGame({
      id: "",
      blocks: [],
      columns: 0,
      mines: 0,
      rows: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    return () => {
      window.removeEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  useEffect(() => {
    buildGame({
      columns,
      mines,
      rows,
    });
    setStatus(GameStatus.IDLE);
  }, [columns, mines, rows]);

  return {
    game,
    endGame,
    reveal,
    flag,
    time: timer.time,
    status,
    reset,
  };
};
