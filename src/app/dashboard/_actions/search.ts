"use server";

import { db } from "@/lib/prisma";

export const searchReleases = async (
  userName?: string,
  dateFrom?: Date,
  dateTo?: Date,
  tipo?: string, // Parâmetro tipo com valor padrão "All"
) => {
  const releases = await db.lancamentos.findMany({
    where: {
      STATUS: "E",
      ...(userName && {
        usuarios: {
          NOME: {
            contains: userName, // Busca parcial por nome de usuário
          },
        },
      }),
      ...(dateFrom && {
        DATA: {
          gte: dateFrom, // Filtro por data "de"
        },
      }),
      ...(dateTo && {
        DATA: {
          lte: dateTo, // Filtro por data "até"
        },
      }),
      ...(tipo === "Expenses" && {
        VALOR: {
          lt: 0, // Filtro para valores menores que 0 (Despesas)
        },
      }),
      ...(tipo === "Income" && {
        VALOR: {
          gt: 0,
        },
      }),
    },
    include: {
      usuarios: {
        select: {
          NOME: true,
        },
      },
      categorias: {
        select: {
          DESCRICAO: true,
        },
      },
    },
  });

  return releases;
};
