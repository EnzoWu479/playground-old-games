import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { limit } from "@/utils/limit";
import { Settings } from "lucide-react";
import { useState } from "react";
import { GameConfig } from "../types/Game";
import { MenuPopover } from "./MenuPopover";

interface Props {
  config: GameConfig;
}
export const Menu = ({ config }: Props) => {
  return (
    <div className="flex gap-4">
      <span>
        Tamanho: {config.columns} x {config.rows}
      </span>
      <span>Bombas: {config.mines}</span>
      <MenuPopover
        config={{
          rows: config.rows,
          columns: config.columns,
          mines: config.mines,
        }}
      />
    </div>
  );
};
