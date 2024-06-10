import { Block } from "./Block";

export interface Game {
  id: string;
  rows: number;
  columns: number;
  blocks: Block[][];
  mines: number;
}
export interface GameConfig {
  rows: number;
  columns: number;
  mines: number;
}
