import { connectDB } from "@/lib/mongodb";
import Scene from "@/models/Scene";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    await connectDB();

    const session = await getSession();

    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const scene = await Scene.findOne({
      userId: session.user.id,
    });

    return Response.json({
      objects: scene?.objects || [],
    });
  } catch (err) {
    return new Response("Server Error", { status: 500 });
  }
}