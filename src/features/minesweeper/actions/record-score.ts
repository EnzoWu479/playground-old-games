"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const recordScore = async (_prevState: any, form: FormData) => {
  const name = form.get("name") as string;
  const time = Number(form.get("time"));
  const rows = Number(form.get("rows"));
  const columns = Number(form.get("columns"));
  const mines = Number(form.get("mines"));

  if (!name) {
    return {
      success: false,
      error: "Nome de jogador é obrigatório",
    };
  }

  const board = await prisma?.minesweeperBoard.findFirst({
    where: {
      rows: rows,
      columns: columns,
      mines: mines,
    },
  });
  await prisma?.minesweeperPlayRecord.create({
    data: {
      playerName: name,
      playTime: time,
      board: {
        connect: board?.id
          ? {
              id: board?.id,
            }
          : undefined,
        create: {
          rows: rows,
          columns: columns,
          mines: mines,
        },
      },
    },
  });

  revalidatePath("/");

  return {
    success: true,
  };
};
