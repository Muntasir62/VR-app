import { connectDB } from "@/lib/mongodb";
import Scene from "@/models/Scene";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getSession();

    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { objects } = body;

    // Upsert (replace existing scene or create new)
    const scene = await Scene.findOneAndUpdate(
      { userId: session.user.id },
      { objects, userId: session.user.id },
      { upsert: true, new: true }
    );

    return Response.json({
      message: "Scene saved successfully",
      scene,
    });
  } catch (err) {
    return new Response("Server Error", { status: 500 });
  }
}