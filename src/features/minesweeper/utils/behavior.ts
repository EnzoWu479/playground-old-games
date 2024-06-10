import { findBlockById } from ".";
import { Block } from "../types/Block";

interface RevealBlockProps {
  row: number;
  column: number;
  blocks: Block[][];
  lastBlocks?: string[];
}

export const revealBlock = ({
  row,
  column,
  blocks,
  lastBlocks,
}: RevealBlockProps) => {
  const block = blocks[row][column];
  if (!lastBlocks) {
    lastBlocks = [];
  }

  if (lastBlocks.includes(block.id)) {
    return blocks;
  }
  if (block.flagged) {
    return blocks;
  }
  lastBlocks.push(block.id);

  block.revealed = true;

  if (block.siblingMines === 0) {
    const siblings = block.siblings;
    for (const sibling_id of siblings) {
      const sibling = findBlockById(blocks, sibling_id);
      if (!sibling) {
        continue;
      }
      blocks = revealBlock({
        row: sibling.x,
        column: sibling.y,
        blocks,
        lastBlocks,
      });
    }
  }
  return blocks;
};
export const hasWon = (blocks: Block[][]) => {
  for (const row of blocks) {
    for (const block of row) {
      if (!block.isMine && !block.revealed) {
        return false;
      }
    }
  }
  return true;
};
