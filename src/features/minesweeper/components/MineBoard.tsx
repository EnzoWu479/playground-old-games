import { Button } from "@/components/ui/button";
import { Block } from "../types/Block";
import { MineBlock } from "./MineBlock";

interface Props {
  blocks: Block[][];
  flag: (row: number, column: number) => void;
  reveal: (row: number, column: number) => void;
  finished: boolean;
  reset: () => void;
}

export const MineBoard = ({ blocks, flag, reveal, finished, reset }: Props) => {
  // if (finished) {
  //   return (
  // <div className="w-full aspect-square bg-slate-400 flex justify-center items-center text-white">
  //   <Button onClick={reset}>Resetar</Button>
  // </div>
  //   );
  // }
  return (
    <div className="max-w-[90dvw] overflow-auto flex justify-center relative">
      <div>
        {blocks.map((row, i) => (
          <div key={i} className="flex">
            {row.map((block, j) => (
              <MineBlock
                block={block}
                handleFlag={() => flag(i, j)}
                handleReveal={() => reveal(i, j)}
                key={block.id}
              />
            ))}
          </div>
        ))}
      </div>
      {finished && (
        <div className="inset-0 bg-slate-400 bg-opacity-50 flex justify-center items-center text-white absolute">
          <Button onClick={reset}>Resetar</Button>
        </div>
      )}
    </div>
  );
};
