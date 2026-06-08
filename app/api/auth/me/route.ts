import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json(session);
}