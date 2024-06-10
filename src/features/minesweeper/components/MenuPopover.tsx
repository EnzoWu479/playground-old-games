"use client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GameConfig } from "../types/Game";

interface Props {
  config: GameConfig;
}

export const MenuPopover = ({ config: routeConfig }: Props) => {
  const router = useRouter();
  const [config, setConfig] = useState(routeConfig);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("rows", String(config.rows));
    urlSearchParams.append("columns", String(config.columns));
    urlSearchParams.append("mines", String(config.mines));

    router.push("/?" + urlSearchParams.toString());
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Settings />
      </PopoverTrigger>
      <PopoverContent asChild className="flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="width">Colunas</Label>
              <Input
                className="w-24"
                id="width"
                type="number"
                min={5}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    columns: limit(Number(e.target.value), 5, 50),
                  })
                }
                value={config.columns}
              />
            </div>
            <div>
              <Label htmlFor="height">Linhas</Label>
              <Input
                className="w-24"
                id="height"
                type="number"
                min={5}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    rows: limit(Number(e.target.value), 5, 50),
                  })
                }
                value={config.rows}
              />
            </div>
            <div>
              <Label htmlFor="bombs">Bombas</Label>
              <Input
                className="w-24"
                id="bombs"
                type="number"
                min={1}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    mines: limit(
                      Number(e.target.value),
                      1,
                      config.rows * config.columns - 1
                    ),
                  })
                }
                value={config.mines}
              />
            </div>
          </div>
          <Button>Alterar configuração</Button>{" "}
        </form>
      </PopoverContent>
    </Popover>
  );
};
