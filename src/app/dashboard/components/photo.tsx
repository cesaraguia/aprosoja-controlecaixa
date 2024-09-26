"use client";

import { useEffect, useState } from "react";
import { searchPhotos } from "../_actions/searchPhotos";
import { PhotoItem } from "./photo-item";

interface Photo {
  ID_FOTO: string;
}

export const Photo = ({ idLancamento }: { idLancamento: string }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      const foundPhoto = await searchPhotos(idLancamento[0]);
      setPhotos(foundPhoto);
    };

    fetchPhoto();
  }, [idLancamento]);

  return (
    <>
      <div className="flex flex-wrap">
        {photos.map((photo, index) => (
          <>
            <PhotoItem key={index} id={photo.ID_FOTO} />
          </>
        ))}
      </div>
    </>
  );
};
