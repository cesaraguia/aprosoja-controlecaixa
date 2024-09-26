import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Photo } from "../../components/photo";

interface PhotoPagesProps {
  params: {
    id: string;
  };
}

export default async function PhotoPage({ params: { id } }: PhotoPagesProps) {
  const session = await getServerSession();

  if (!session) redirect("/");

  return <Photo idLancamento={id} />;
}
