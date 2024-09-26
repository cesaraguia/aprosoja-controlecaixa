import Link from "next/link";

export const Header = () => {
  const dateIni = new Date(new Date().setDate(new Date().getDate() - 30));
  const dateFin = new Date();

  return (
    <nav className="flex items-center gap-5 py-2">
      <Link href="./" className="text-sm font-medium text-zinc-300">
        Home
      </Link>
      <Link
        href={`./releases?dateIni=${dateIni}&dateFin=${dateFin}&type=Todos`}
        className="text-sm font-medium"
      >
        Lançamentos
      </Link>
    </nav>
  );
};
