"use server";

import { db } from "@/lib/prisma";

export const searchPhoto = async (idFoto: string) => {
  const photo = await db.fotos.findUnique({
    where: {
      ID_FOTO: idFoto,
    },
    select: {
      FOTO: true,
      DATA: true,
    },
  });

  if (photo && photo.FOTO) {
    const base64Photo = Buffer.from(photo.FOTO).toString("base64");
    return { base64Photo, data: photo.DATA };
  }

  return null;
};
