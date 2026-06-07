import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function ScenePage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        VR Scene
      </h1>

      <p className="mt-3">
        Logged in as {session.user?.email}
      </p>
    </div>
  );
}