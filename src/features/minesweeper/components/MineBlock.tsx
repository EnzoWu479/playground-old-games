import { cn } from "@/lib/utils";
import { Block } from "../types/Block";

interface Props {
  block: Block;
  handleReveal: () => void;
  handleFlag: () => void;
}
export const MineBlock = ({ block, handleReveal, handleFlag }: Props) => {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.button);

    if (e.button === 2) {
      e.preventDefault();
      handleFlag();
    }
    if (e.button === 0) {
      handleReveal();
    }
  };

  const getContent = () => {
    if (block.flagged) {
      return "🚩";
    }
    if (block.revealed) {
      return block.isMine ? "💣" : block.siblingMines || "";
    }
    return "";
  };
  // if (block.flagged) {
  //   return (
  //     <div
  //       className="w-8 h-8 border border-gray-300 bg-slate-700 flex items-center justify-center cursor-pointer"
  //       onMouseDown={onMouseDown}
  //     >
  //       🚩
  //     </div>
  //   );
  // }
  // if (!block.revealed) {
  //   return (
  //     <div
  //       className="w-8 h-8 border border-gray-300 bg-slate-700 cursor-pointer"
  //       // onClick={handleReveal}
  //       onMouseDown={onMouseDown}
  //     ></div>
  //   );
  // }

  // return (
  //   <div className="w-8 h-8 border border-gray-300 flex items-center justify-center cursor-default">
  //     {block.isMine ? "💣" : block.siblingMines || ""}
  //   </div>
  // );
  return (
    <div
      className={cn(
        "w-8 h-8 min-w-8 border border-gray-300 flex items-center justify-center select-none",
        block.revealed ? "cursor-default" : "cursor-pointer",
        block.revealed ? "bg-gray-200" : "bg-slate-700"
      )}
      onMouseDown={onMouseDown}
    >
      {getContent()}
    </div>
  );
};
