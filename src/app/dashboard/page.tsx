import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Dashboard } from "./components/dashboard";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) redirect("/");

  return <Dashboard />;
}
