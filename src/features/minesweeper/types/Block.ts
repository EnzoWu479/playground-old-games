export interface Block {
  id: string;
  x: number;
  y: number;
  isMine: boolean;
  flagged: boolean;
  revealed: boolean;
  siblings: string[];
  siblingSides: string[];
  siblingMines: number;
}