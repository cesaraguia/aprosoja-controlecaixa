"use server";

import { db } from "@/lib/prisma";

export const searchPhotos = async (idLancamento: string) => {
  console.log(idLancamento);

  const photos = await db.fotos.findMany({
    where: {
      ID_LANCAMENTO: idLancamento,
      STATUS: "E",
    },
    select: {
      ID_FOTO: true,
    },
  });

  return photos;
};
