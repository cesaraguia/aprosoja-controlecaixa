import { useEffect, useState } from "react";
import { searchPhoto } from "../_actions/searchPhoto";

// Define um tipo para a foto
interface PhotoType {
  base64Photo: string;
  data: Date;
}

export const PhotoItem = ({ id }: { id: string }) => {
  const [photo, setPhoto] = useState<PhotoType | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const foundPhoto = await searchPhoto(id);
      setPhoto(foundPhoto);
    };

    fetchPhoto();
  }, [id]);

  if (!photo) {
    return (
      <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/5">Loading...</div>
    );
  }

  const photoSrc = `data:image/png;base64,${photo.base64Photo}`;

  return (
    <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/5">
      <img src={photoSrc} alt="teste" className="h-full" />
      <span>
        {photo.data ? new Date(photo.data).toLocaleDateString() : "N/A"}
      </span>
    </div>
  );
};
