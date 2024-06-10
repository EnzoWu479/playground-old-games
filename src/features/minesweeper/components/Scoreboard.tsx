"use server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GameConfig } from "../types/Game";
import { prisma } from "@/lib/prisma";
import { hourFormated } from "@/features/timer/utils";
import { formaters } from "@/helpers/formaters";

interface Props {
  config: GameConfig;
}

const getData = async (config: GameConfig) => {
  const response = await prisma?.minesweeperPlayRecord.findMany({
    where: {
      board: {
        rows: config.rows,
        columns: config.columns,
        mines: config.mines,
      },
    },
    orderBy: {
      playTime: "asc",
    },
  });
  return response;
};

export const Scoreboard = async ({ config }: Props) => {
  const data = await getData(config);
  return (
    <div>
      <h1>Scoreboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tempo</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.playerName}</TableCell>
              <TableCell>{hourFormated(record.playTime)}</TableCell>
              <TableCell>
                {formaters.date(record.createdAt.toISOString())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
