import { Block } from "../types/Block";

interface SiblingMinesProps {
  x: number;
  y: number;
  rows: number;
  columns: number;
  blocks: Block[][];
}

export const getSiblingMines = ({
  x,
  y,
  blocks: _blocks,
  columns,
  rows,
}: SiblingMinesProps): Block[] => {
  const siblings = [];
  const blocks = [..._blocks];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < columns) {
        siblings.push(blocks[i][j]);
      }
    }
  }
  return siblings;
};
export const getSiblingSides = ({
  x,
  y,
  blocks: _blocks,
  columns,
  rows,
}: SiblingMinesProps): Block[] => {
  const siblings = [];
  const blocks = [..._blocks];
  if (x - 1 >= 0) {
    siblings.push(blocks[x - 1][y]);
  }
  if (x + 1 < rows) {
    siblings.push(blocks[x + 1][y]);
  }
  if (y - 1 >= 0) {
    siblings.push(blocks[x][y - 1]);
  }
  if (y + 1 < columns) {
    siblings.push(blocks[x][y + 1]);
  }
  return siblings;
};

interface GenerateMinesProps {
  rows: number;
  columns: number;
  mines: number;
}

export const generateMines = ({
  columns,
  mines: minesTotal,
  rows,
}: GenerateMinesProps): boolean[][] => {
  const mines: boolean[][] = [];
  for (let i = 0; i < rows; i++) {
    mines[i] = [];
    for (let j = 0; j < columns; j++) {
      mines[i][j] = false;
    }
  }
  let minesCount = 0;
  while (minesCount < minesTotal) {
    const i = Math.floor(Math.random() * rows);
    const j = Math.floor(Math.random() * columns);
    if (!mines[i][j]) {
      mines[i][j] = true;
      minesCount++;
    }
  }
  return mines;
};

interface GenerateBlockProps {
  columns: number;
  mines: number;
  rows: number;
}

export const generateBlocks = ({
  columns,
  mines: totalMines,
  rows,
}: GenerateBlockProps) => {
  const mines = generateMines({
    columns: columns,
    mines: totalMines,
    rows: rows,
  });
  const _blocks: Block[][] = [];
  for (let i = 0; i < rows; i++) {
    _blocks[i] = [];
    for (let j = 0; j < columns; j++) {
      _blocks[i][j] = {
        id: crypto.randomUUID(),
        x: i,
        y: j,
        isMine: mines[i][j],
        flagged: false,
        revealed: false,
        siblingMines: 0,
        siblings: [],
        siblingSides: [],
      };
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const siblings = getSiblingMines({
        x: i,
        y: j,
        blocks: _blocks,
        columns: columns,
        rows: rows,
      });
      const siblingSides = getSiblingSides({
        x: i,
        y: j,
        blocks: _blocks,
        columns: columns,
        rows: rows,
      });
      _blocks[i][j] = {
        id: _blocks[i][j].id,
        x: i,
        y: j,
        isMine: _blocks[i][j].isMine,
        flagged: false,
        revealed: false,
        siblings: siblings.map((s) => s.id),
        siblingSides: siblingSides.map((s) => s.id),
        siblingMines: siblings.filter((s) => s.isMine).length,
      };
    }
  }
  return _blocks;
};
