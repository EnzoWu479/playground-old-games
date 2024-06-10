import { Block } from "../types/Block";

export const findBlockById = (blocks: Block[][], id: string) => {
  for (const row of blocks) {
    for (const block of row) {
      if (block.id === id) {
        return block;
      }
    }
  }
  return null;
};

